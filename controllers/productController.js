const uuid = require('uuid')
const path = require('path')
const { Product, Rating } = require('../models/models')
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next) {
        try {
            const { name, price, brandId, typeId, materialId, description } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({ name, price, brandId, typeId, description, materialId, img: fileName })
            return res.json(product)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }
    async getAll(req, res) {
        let { brandId, typeId, materialId, limit, page } = req.query
        page = page || 1
        limit = limit || 6
        let offset = page * limit - limit
        let product;
        if (!brandId && !typeId && !materialId ) {
            product = await Product.findAndCountAll({ limit, offset })
        }

        if (brandId && !typeId && !materialId) {
            product = await Product.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId && !materialId) {
            product = await Product.findAndCountAll({ where: { typeId }, limit, offset })
        }
    
        if (!brandId && !typeId && materialId) {
            product = await Product.findAndCountAll({ where: { materialId }, limit, offset })
        }

        if (!brandId && typeId && materialId) {
            product = await Product.findAndCountAll({ where: { materialId, typeId }, limit, offset })
        }

        if (brandId && !typeId && materialId) {
            product = await Product.findAndCountAll({ where: { brandId, materialId }, limit, offset })
        }

        if (brandId && typeId && !materialId) {
            product = await Product.findAndCountAll({ where: { brandId, typeId }, limit, offset })
        }


        if (brandId && typeId && materialId) {
            product = await Product.findAndCountAll({ where: { typeId, brandId, materialId }, limit, offset })
        }
      
        return res.json(product)
    }

    async getAllProducts(req, res){
        const products = await Product.findAndCountAll()
        return res.json(products)
    }

    async getOne(req, res, next) {
        const { id } = req.params
        const product = await Product.findOne({ where: { id } })
        return res.json(product)
    }

    async addRating(req, res, next) {
         const { name, productId, userId, rate, description } = req.body
        const rating = await Rating.findOne({ where: { userId :userId, productId:productId} })
        if (rating) {
            return next(ApiError.internal('Вы уже оценивали этот товар'))
        }
        else {
            const newRating = await Rating.create({ name, userId, productId, rate, description })
            const ratings = await Rating.findAndCountAll({ where: { productId: productId } })
            let r = 0;
            ratings.rows.forEach(e => {
                r += Number(e.rate)
            })
            const currentReting = Math.floor(r / ratings.count)
            Product.update({ rating: currentReting }, {
                where: {
                    id: productId
                }
            }).then((res) => {
                if (!res)
                    return next(ApiError.internal('Не удалось обновить рейтинг'))
            })
            return res.json(newRating)
        }
    }

    async deleteProduct(req, res, next) {
        const { id } = req.params
        const product = await Product.destroy({ where: id })
        if (!product) {
            return next(ApiError.badRequest('Не удалось удалить продукт'))
        }
        return res.json(product)
    }
    async getAllRating(req, res, next) {
        let { id } = req.params
        console.log('ПРОДУКТ', id )
        const ratings = await Rating.findAndCountAll({ where: { productId: id } })
        if (!ratings) {
            return next(ApiError.badRequest('Не удалось удалить продукт'))
        }
        return res.json(ratings)
    }
}

module.exports = new ProductController()
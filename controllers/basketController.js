const { BasketProduct } = require('../models/models.js')
const { Basket } = require('../models/models.js')
const ApiError = require('../error/ApiError.js')
const sequelize = require('../db.js')

class BasketController {
    async create(req, res, next) {
        try {
            const { userId, productId, count } = req.body

            const productExist = await BasketProduct.findOne({ where: { basketId: userId, productId } })

            if (productExist) {
                const newCount = Number(productExist.count) + Number(count)
                BasketProduct.update({ count: newCount }, {
                    where: {
                        productId,
                        basketId: userId
                    }
                }).then((res) => {
                    if (!res)
                        return next(ApiError.internal('Не удалось обновить колличество'))
                })
                return res.json(productExist)
            }
            else {
                const product = await BasketProduct.create({ basketId: userId, productId, count })
                return res.json(product)
            }
        } catch { (e) => next(ApiError.internal(e.message)) }
    }

    async getAllUserProduct(req, res, next) {
        const { id } = req.params
        const products = await sequelize.query(`Select p.id, p.name, p.price, p.rating, p.img, b.count 
                                                FROM products AS p JOIN basketproducts AS b ON 
                                                p.id = b."productId"
                                                WHERE b."basketId" = (SELECT id
                                                FROM baskets
                                                WHERE
                                                baskets."userId" =${id})`)
        if (!products) {
            return next(ApiError.internal('Не удалось получить продукты'))
        }
        return res.json(products)

    }

    async changeProductCount(req, res, next) {
        try {
            const { userId, productId, count } = req.query
            const result = await sequelize.query(`UPDATE basketproducts
                                                   SET count=${count}
                                                   WHERE "productId"=${productId} 
                                                   AND "basketId"=(
                                                   SELECT id FROM baskets
                                                   WHERE "userId"=(
                                                   SELECT id FROM users WHERE id=${userId}))`)

            if (!result)
                return next(ApiError.internal('Не удалось обновить колличество'))
            else res.json(result)

        } catch { (e) => next(ApiError.internal(e.message)) }
    }

    async getOne(req, res) {
        const { id } = req.params
        const product = await BasketProduct.findOne({ where: { id } })
        if (!product) {
            return next(ApiError.internal('Не удалось получить корзину по этому id'))
        }
        return res.json(product)
    }

    async delete(req, res, next) {
        const { userId, productId } = req.query
        console.log(userId, productId)
        /*const basket = await Basket.findOne({ where: { userId } })
        const product = await BasketProduct.destroy({ where: { productId, basketId: basket.id } })*/
        const result = await sequelize.query(`DELETE FROM basketproducts
                                              WHERE  "productId"=${productId} AND "basketId"=(
		                                      SELECT id FROM baskets
                                              WHERE "userId"=(SELECT id FROM users WHERE id=${userId}))`)

        if (!result)
            return next(ApiError.internal('Не удалось обновить удалить продукт из корзины'))

        return res.json(result)
    }
}

module.exports = new BasketController()
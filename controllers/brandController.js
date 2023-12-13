const { Brand } = require('../models/models.js')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res, next) {
        const { name } = req.body
        const existBrand = await Brand.findOne({ where: { name } })
        if (existBrand) {
            return next(ApiError.internal('Этот бренд уже существует'))
        }
        const brand = await Brand.create({ name })
        if (!brand) {
            return next(ApiError.internal('Не удалось создать бренд'))
        }
        return res.json(brand)
    }

    async getAll(req, res, next) {
        const brands = await Brand.findAll()
        if (!brands) {
            return next(ApiError.internal('Не удалось получить бренды'))
        }
        return res.json(brands)
    }

    async deleteBrand(req, res) {
        const { id } = req.params
        const brand = await Brand.destroy({ where: { id } })
        if (!brand) {
            return next(ApiError.internal('Не удалось удалить бренд'))
        }
        return res.json(brand)
    }

    async getOne(req, res, next) {
        const { id } = req.params
        const brand = await Brand.findOne({ where: { id } })
        if(!brand){
            return next(ApiError.internal('Не удалось получить бренд по этому id'))
        }
        return res.json(brand)
    }

}

module.exports = new BrandController()
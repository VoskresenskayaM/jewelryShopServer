const { Material } = require('../models/models.js')
const ApiError = require('../error/ApiError')

class MaterialController {
    async create(req, res, next) {
        const { name } = req.body
        const existMaterial = await Material.findOne({ where: { name } })
        if (existMaterial) {
            return next(ApiError.internal('Этот материал уже существует'))
        }
        const material = await Material.create({ name })
        if (!material) {
            return next(ApiError.internal('Не удалось создать материал'))
        }
        return res.json(material)
    }

    async getAll(req, res, next) {
        const materials = await Material.findAll()
        if (!materials) {
            return next(ApiError.internal('Не удалось получить материал'))
        }
        return res.json(materials)
    }
    async deleteMaterial(req, res) {
        const { id } = req.params
        const material = await Material.destroy({ where: { id } })
        if (!material) {
            return next(ApiError.internal('Не удалось удалить материал'))
        }
        return res.json(material)
    }

    async getOne(req, res, next) {
        const { id } = req.params
        const material = await Material.findOne({ where: { id } })
        if(!material){
            return next(ApiError.internal('Не удалось получить материал по этому id'))
        }
        return res.json(material)
    }
}

module.exports = new MaterialController()
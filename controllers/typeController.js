const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {

    async create(req, res, next) {
        const { name } = req.body
        const existType = await Type.findOne({ where: { name }})
        if (existType) {
            return next(ApiError.internal('Этот тип уже существует'))
        }
        const type = await Type.create({ name })
        if (!type) {
            return next(ApiError.internal('Не удалось создать тип'))
        }
        return res.json(type)
    }

    async getAll(req, res, next) {
        const types = await Type.findAll()
        if (!types) {
            return next(ApiError.internal('Не удалось получить типы'))
        }
        return res.json(types)
    }

    async deleteType(req, res, next) {
        const { id } = req.params
        const type = await Type.destroy({ where: { id } })
        if (!type) {
            return next(ApiError.internal('Не удалось удалить тип'))
        }
        return res.json(type)
    }

    async getOne(req, res, next) {
        const { id } = req.params
        const type = await Type.findOne({ where: { id } })
        if(!type){
            return next(ApiError.internal('Не удалось получить тип по этому id'))
        }
        return res.json(type)
    }

}
module.exports = new TypeController()
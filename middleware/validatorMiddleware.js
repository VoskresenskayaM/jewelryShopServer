const { celebrate, Joi, Segments } = require('celebrate');
const { img, name, regPassword, email, role } = require('../utils')

module.exports.brandCreateValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().pattern(name)
    })
})

module.exports.brandDeleteValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
})

module.exports.typeCreateValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().pattern(name)
    })
})

module.exports.typeDeleteValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
})

module.exports.basketValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
})

module.exports.basketCreateValidator = celebrate({
    [Segments.QUERY]: Joi.object().keys({
        basketId: Joi.number().required(),
        productId: Joi.number().required()
    })
})

module.exports.typeValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().pattern(name)
    })

})

module.exports.productCreateValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(5).max(100),
        price: Joi.number().required(),
        img: Joi.string().pattern(img),
        description: Joi.string().required(),
        brandId: Joi.number(),
        typeId: Joi.number(),
        materialId: Joi.number()
    })
})

module.exports.registrationValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().pattern(email),
        password: Joi.string().required().pattern(regPassword),
        role: Joi.string().pattern(role)
    })
})


module.exports.materialCreateValidator= celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required().pattern(name)
    })
})

module.exports.materialDeleteValidator = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
})


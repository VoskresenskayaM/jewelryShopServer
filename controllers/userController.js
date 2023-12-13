const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User, Basket, UserLikes, Product } = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY,
        { expiresIn: '24h' })
}

class UserController {

    async registration(req, res, next) {
        try {
            const { email, password, role } = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'))
            }
            const candidate = await User.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            else {
                const hashPassword = await bcrypt.hash(password, 5)
                const user = await User.create({ email, role, password: hashPassword })
                const basket = await Basket.create({ userId: user.id })
                const token = generateJwt(user.id, user.email, user.role)
                return res.json({ token })
            }
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return next(ApiError.internal('Пользователь с таким именем не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }

    async getAllUsers(req, res) {
        try {
            const users = await User.findAll()
            return res.json(users)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params
            const user = User.destroy({ where: id })
            if (!user) {
                return next(ApiError.badRequest('Не удалось удалить пользователя'))
            }
            else {
                const basket = await Basket.destroy({ userId: user.id })
                return res.json(user)
            }
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getCurrentUser(req, res, next) {
        try {
            if (!req.user) {
                return next(ApiError.badRequest('Не удалось найти пользователя'))
            }
            return res.json(req.user)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async setLike(req, res, next) {
        try {
            let { userId, productId } = req.query
            const like = await UserLikes.create({ userId, productId })
            return res.json(like)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteLike(req, res, next) {
        try {
            let { userId, productId } = req.query
            const like = await UserLikes.destroy({ where: { userId: userId, productId: productId } })
            return res.json(like)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }
    async getAllUserLike(req, res, next) {
        try {
            let { userId } = req.query
            const likes = await UserLikes.findAll({ where: { userId: userId } })
            return res.json(likes)
        }
        catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}
module.exports = new UserController()
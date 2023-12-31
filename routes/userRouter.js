const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const {registrationValidator} = require('../middleware/validatorMiddleware')

router.post('/registration', registrationValidator, userController.registration)
router.post('/login', registrationValidator, userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/all', userController.getAllUsers )
router.get('/me', authMiddleware, userController.getCurrentUser )
router.get('/like', userController.setLike)
router.get('/deleteLike', userController.deleteLike)
router.get('/allUserLike', userController.getAllUserLike)
module.exports = router
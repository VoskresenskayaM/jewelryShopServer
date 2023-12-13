const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const { brandDeleteValidator, brandCreateValidator } = require('../middleware/validatorMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', brandCreateValidator, checkRole('ADMIN'),  brandController.create)
router.get('/',   brandController.getAll)
router.delete('/:id', brandDeleteValidator, brandController.deleteBrand )
router.get('/:id',  brandController.getOne)

module.exports = router
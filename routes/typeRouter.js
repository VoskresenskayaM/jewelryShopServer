const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const { typeCreateValidator, typeDeleteValidator } = require('../middleware/validatorMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeCreateValidator, typeController.create)
router.get('/', typeController.getAll)
router.get('/:id', typeController.getOne)
router.delete('/:id', typeDeleteValidator, typeController.deleteType)
module.exports = router
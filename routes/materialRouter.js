const Router = require('express')
const router = new Router()
const materialController = require('../controllers/materialController')
const { materialCreateValidator, materialDeleteValidator } = require('../middleware/validatorMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', materialCreateValidator, checkRole('ADMIN'), materialController.create)
router.get('/',   materialController.getAll)
router.delete('/:id', materialDeleteValidator, materialController.deleteMaterial )
router.get('/:id', materialController.getOne )
module.exports = router
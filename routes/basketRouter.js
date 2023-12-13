const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const { basketValidator, basketCreateValidator } = require('../middleware/validatorMiddleware')
router.post('/', /*basketCreateValidator,*/ basketController.create) 
router.get('/:id', basketController.getAllUserProduct)
router.put('/count', basketController.changeProductCount)
router.get('/:id', basketValidator, basketController.getOne)
router.delete('/delete', /*basketValidator,*/ basketController.delete)

module.exports = router
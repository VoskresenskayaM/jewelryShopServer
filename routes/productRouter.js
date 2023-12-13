const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const {productCreateValidator} = require('../middleware/validatorMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', /*productCreateValidator,*/checkRole('ADMIN'), productController.create)
router.get('/', productController.getAll)
router.get('/all', productController.getAllProducts)
/*router.get('/ratings', productController.getAllRating)*/
router.get('/:id', productController.getOne)
router.put('/rating', productController.addRating)
router.get('/:id/rating', productController.getAllRating)
router.delete('/:id', productController.deleteProduct)


module.exports = router
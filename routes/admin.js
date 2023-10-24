const express = require('express')


const ProductPage=require('../controllers/admin')
// const path=require('path')
// const routeDir=require('../utils/path')
const isAuth=require('../middleware/is-auth')

const router = express.Router()



// console.log(router)

router.get('/add-product',isAuth,ProductPage.getAddProductPage)

router.post('/add-product',isAuth,ProductPage.postAddProductPage)

router.get('/edit-product/:ProductID',isAuth,ProductPage.getEditProduct)

router.post('/edit-product/',isAuth,ProductPage.updateProduct)

router.get('/products',isAuth,ProductPage.getAdminProductsPage)

router.post('/deleteProduct/:productID',isAuth,ProductPage.deleteProduct)

exports.routes= router


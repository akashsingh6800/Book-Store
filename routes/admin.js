const express = require('express')

const ProductPage=require('../controllers/admin')
const path=require('path')
const routeDir=require('../utils/path')
const router = express.Router()



console.log(router)

router.get('/add-product',ProductPage.getAddProductPage)

router.post('/add-product',ProductPage.postAddProductPage)

router.get('/edit-product/:ProductID',ProductPage.getEditProduct)

router.post('/edit-product/',ProductPage.updateProduct)

// router.post('/edit-product/:productID',(req,res)=>{
//     console.log(req.params.productID)
//     res.redirect('/')
// })

router.get('/products',ProductPage.getAdminProductsPage)

router.post('/deleteProduct/:productID',ProductPage.deleteProduct)

exports.routes= router


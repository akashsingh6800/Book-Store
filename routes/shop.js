
const express=require('express');

const shopController=require('../controllers/shop')
// const Admin=require('./admin')
// const path=require('path')
// const routeDir=require('../utils/path');
// //const { products } = require('./admin');

const router=express.Router();


router.get('/',shopController.getIndex)

//  router.get('/cart',shopController.getCart)

// router.post('/cart',shopController.postCart)

// router.post('/deleteFromCart/:id',shopController.DeleteProductFromCart)

// router.post('/create-order',shopController.postOrder)

// router.get('/orders',shopController.getOrder)

router.get('/products',shopController.displayProductPage)

router.get('/products/:productID',shopController.getProductDetail)
// // //router.get('products/delete',somefunction)

// // router.get('/checkout',shopController.checkout)

module.exports=router;

//const products=[]
const Product=require('../model/product')
const { getDb } = require('../utils/database')
//const Cart=require('../model/cart')

exports.displayProductPage=(req,res)=>{
    //res.send('<h1>Hello from EEExpress!</h1>')
    //res.sendFile('./shop.html')
    // console.log(Admin.products)
    // res.sendFile(path.join(routeDir,'views','shop.html'));
    // Product.fetchAll((product)=>{
    //   console.log(product)
    // })

    
    // Product.fetchAll((product)=>{
    //   res.render('shop/product-list.ejs',{prods:product,pageTitle:"All Products",path:"/products"})

    // })

    // Product.fetchAll()
    // .then(([rows,fields])=>{
    //   res.render('shop/product-list.ejs',{prods:rows,pageTitle:"All Products",path:"/products"})
    // })
    Product.fetchAll().then((product)=>{
      //console.log(product)
      res.render('shop/product-list.ejs',{prods:product,pageTitle:"All Products",path:"/products"})
    }).catch((err)=>{
      console.log(err)
    })
    
    }
  
exports.postOrder=(req,res,next)=>{
  
   req.user.createOrder().then(result=>{
     res.redirect('/orders')
   })
}

// exports.postOrder=(req,res,next)=>{
// let fetchedCart;
//

// req.user.getCart().then(cart=>{
//   fetchedCart=cart
//   return cart.getProducts()
// }).then(products=>{
//   return req.user.createOrder().then(order=>{
//      return order.addProducts(products.map(product=>{
//       product.orderItem= {quantity: product.cartItem.quantity}
//       return product
//     }))
//   }).catch(err=>console.log(err))


// })

// .then(result=>{
//   fetchedCart.setProducts(null)
//   })
//   .then(result=>{
//     res.redirect('/orders')
//   })
// .catch(err=> console.log(err))
// }

exports.getOrder=(req,res,next)=>{

  req.user.getOrder().then(order=>{
    res.render('shop/orders',{path:'/orders', pageTitle:'Your Orders', orders: order})
  })
  // req.user.getOrder().then(order=>{
  //   res.render('shop/orders',{path:'/orders', pageTitle:'Your Orders', orders: order})
  // })
  
// req.user.getOrders({include: ['products']}).then(order=>{
//   res.render('shop/orders',{path:'/orders', pageTitle:'Your Orders', orders: order})
// })

}

exports.getCart=(req,res,next)=>{
req.user.getCart().then(cartProducts=>{
  console.log(cartProducts)
  res.render('shop/cart', {cart:cartProducts,path:'/cart', pageTitle:'Your Cart'})
})

}

// exports.getCart=(req,res)=>{
 
// console.log("Hello")
//   req.user.getCart()
//   .then((cart)=>{
//     return cart.getProducts().then((products)=>{
//       res.render('shop/cart', {cart:products,path:'/cart', pageTitle:'Your Cart'})
//     }).catch(err=>console.log(err))
//   }).catch(err=> console.log(err))
//   // Cart.getProduct(cart=>{
//   //   // Product.fetchAll(products=>{
//   //   //   const cartProducts=[]
//   //   //   //console.log("Print the products")
//   //   // //  console.log(products)
//   //   //   for(produ of products){
//   //   //    // console.log("Printing produ")
//   //   //     //console.log(produ)
//   //   //     const cartData = cart.product.findIndex(prod=>prod.id == produ.id)
//   //   //     //console.log(produ.id==cart.product[0].id)
//   //   //     if(cartData!=-1)
//   //   //     {
//   //   //     //  console.log("Adding in th cart")
        
//   //   //       cartProducts.push({productData:produ,qty:cart.product[cartData].qty})
//   //   //     }
//   //   //   }
//   //   //  // console.log(cartProducts)
//   //   //   res.render('shop/cart', {cart:cartProducts,path:'/cart', pageTitle:'Your Cart'})
//   //   // })
//   //   //res.render('shop/cart', {cart:,path:'/cart', pageTitle:'Your Cart'})
//   // })
 

// }

exports.postCart=(req,res,next)=>{
  const prodID = req.body.productID
  
  const db=getDb()
  Product.getProduct(prodID).then(product=>{
    
    return req.user.addToCart(product[0])

  }).then(result=>{
    res.redirect('/cart')
  })
  .catch(err=> console.log(err))
  




}

// exports.postCart=(req,res)=>{

//   const prodID = req.body.productID
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user.getCart().then(cart=>{
//     fetchedCart=cart
//     return cart.getProducts({where:{id:prodID}})
//   }).then(products=>{
//     let product;
//     if(products.length>0){
//       product=products[0]
//     }
    
//     if(product){
//       ////
//       const oldQuantity=product.cartItem.quantity;
//       newQuantity = oldQuantity +1
//       return product

//     }
//     return Product.findByPk(prodID)
//     })
//     .then(product=>{
//       return fetchedCart.addProduct(product, {
//         through:{quantity: newQuantity}
//       })
//     })
//     .then(()=>{
//       res.redirect('/cart')
//     }).catch(err=>console.log(err))
  
  
//   // const product = Product.getProducts(req.body.productID,(product)=>{
//   //   Cart.addProduct(req.body.productID,product.price)
//   //   res.redirect('/cart')
//   // })
  
//  // console.log(req.body.productID)
//  //res.render('shop/cart',{prods:product,pageTitle:"Cart",path:"shop/cart"})
// }

exports.getProducts=(req,res)=>{

  res.render('shop/product-detail',{path:'/products',pageTitle:'Product List'})
}

exports.getIndex=(req,res)=>{

  Product.fetchAll().then((product)=>{
   // console.log(product)
    res.render('shop/index',{prods:product,pageTitle:"Shop",path:"/index"})
  }).catch((err)=>{
    console.log(err)
  })

  // Product.fetchAll().then(([rows,fields])=>{
  //  // console.log(product)
  //   res.render('shop/index',{prods:rows,pageTitle:"Shop",path:"/index"})
  // })
  // Product.fetchAll((product)=>{
  //   res.render('shop/index',{prods:product,pageTitle:"Shop",path:"/index"})

  // })
  //res.render('shop/index',{path:'/index',pageTitle:'Shop'})

}

exports.checkout=(req,res)=>{

  res.render('shop/checkout',{path:'/checkout',pageTitle:"Checkout"})
}

exports.getProductDetail=(req,res)=>{
  //console.log(req.params.id)
// Product.getProduct(req.params.productID,(product)=>{
//  // res.render('shop/product-detail',{prod:{title:"Ha",price:232,description:"",imageURL:""},path:'/product-detal',pageTitle:"Product Detail"})
//  res.render('shop/product-detail',{prod:product,path:'/product-detal',pageTitle:"Product Detail"})


// })
// Product.getProduct(req.params.productID).then(([product])=>{

//   res.render('shop/product-detail',{prod:product[0],path:'/product-detail',pageTitle:"Product Detail"})
// }).catch(()=> console.log("In product page detail"))
  // console.log("In the specific product page")



  // Product.findByPk(req.params.productID).then((result)=>{
  //   console.log(result)
  //   res.render('shop/product-detail',{prod:result,path:'/product-detail',pageTitle:result.title})
  // }).catch((error)=>{
  //   console.log(error)
  // })
  

  Product.getProduct(req.params.productID).then(product=>{
    console.log("In product detail page")
    res.render('shop/product-detail',{prod:product[0],path:'/product-detail',pageTitle:product.title})
  })

}

exports.DeleteProductFromCart=(req,res)=>{
  const productID=req.params.id
  req.user.DeleteProductFromCart(productID).then(result =>{
    res.redirect('/cart')
  })

}

// exports.DeleteProductFromCart=(req,res)=>{

//   const productID=req.params.id
//   req.user.getCart().then(cart=>{
//     return cart.getProducts({where:{id:productID}})
//   }).then(products=>{
//     const product=products[0]
//     return product.cartItem.destroy()
//   }).then(result=>{
//     res.redirect('/')
//   }).catch(err=>{console.log(err)})
//   // Product.getProduct(req.params.id,(product)=>{
    
//   //   Cart.deleteProduct(req.params.id,product.price)
  
//   //   res.redirect('/')
//   // })

// }

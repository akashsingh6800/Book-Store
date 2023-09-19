
//const products=[]
const Product=require('../model/product')
const Cart=require('../model/cart')

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
    Product.findAll().then((product)=>{
      //console.log(product)
      res.render('shop/product-list.ejs',{prods:product,pageTitle:"All Products",path:"/products"})
    }).catch((err)=>{
      console.log(err)
    })
    
    }
  


exports.getCart=(req,res)=>{

  Cart.getProduct(cart=>{
    // Product.fetchAll(products=>{
    //   const cartProducts=[]
    //   //console.log("Print the products")
    // //  console.log(products)
    //   for(produ of products){
    //    // console.log("Printing produ")
    //     //console.log(produ)
    //     const cartData = cart.product.findIndex(prod=>prod.id == produ.id)
    //     //console.log(produ.id==cart.product[0].id)
    //     if(cartData!=-1)
    //     {
    //     //  console.log("Adding in th cart")
        
    //       cartProducts.push({productData:produ,qty:cart.product[cartData].qty})
    //     }
    //   }
    //  // console.log(cartProducts)
    //   res.render('shop/cart', {cart:cartProducts,path:'/cart', pageTitle:'Your Cart'})
    // })
    //res.render('shop/cart', {cart:,path:'/cart', pageTitle:'Your Cart'})
  })
 

}

exports.postCart=(req,res)=>{
  const product = Product.getProduct(req.body.productID,(product)=>{
    Cart.addProduct(req.body.productID,product.price)
    res.redirect('/cart')
  })
  
 // console.log(req.body.productID)
 //res.render('shop/cart',{prods:product,pageTitle:"Cart",path:"shop/cart"})
}

exports.getProducts=(req,res)=>{

  res.render('shop/product-detail',{path:'/products',pageTitle:'Product List'})
}

exports.getIndex=(req,res)=>{

  Product.findAll().then((product)=>{
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
  console.log("In the specific product page")

  Product.findByPk(req.params.productID).then((result)=>{
    console.log(result)
    res.render('shop/product-detail',{prod:result,path:'/product-detail',pageTitle:result.title})
  }).catch((error)=>{
    console.log(error)
  })

}

exports.DeleteProductFromCart=(req,res)=>{
  Product.getProduct(req.params.id,(product)=>{
    
    Cart.deleteProduct(req.params.id,product.price)
  
    res.redirect('/')
  })

}

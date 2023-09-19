
const Product=require('../model/product')



exports.getAddProductPage=(req,res,next)=>{
    // res.send("<form action='/admin/add-product' method='POST'><input type='text' name='Add Product'> <button type='submit'> Add</button>")
   // res.sendFile(path.join(routeDir,'views','add-product.pug'))
   res.render('admin/edit-product',{pageTitle:"Adding Product", path : "/admin/edit-product", editMode: undefined})
 }


 exports.postAddProductPage=(req,res,next)=>{
    const title=req.body.title
    const price=req.body.price
    const description=req.body.description
    const imageURL=req.body.imageURL

    Product.create({
      title:title,
      price:price,
      description:description,
      imageURL:imageURL
    }).then((result)=>{
      res.redirect('/admin/products')
      console.log(result)
    }).catch((error)=>{
      console.log(error)
    })




    // const newProduct= new Product(null,title,price,imageURL,description)
    // newProduct.save().then(()=>{
    //   res.redirect('/');
    // }).catch(()=>{
    //   console.log("Error while fetching the fiel")
    // })
    //products.push({title : req.body.title});
  //  console.log(req.body);
    
}

exports.updateProduct =(req,res)=>{
//  const productID=req.params.productID
//   const updatedProduct={
//     title:req.body.title,
//     price:req.body.price,
//    description : req.body.description,
//   imageURL : req.body.imageURL
//   }

  //  const updateProduct= new Product(req.body.productID,req.body.title,req.body.price,req.body.imageURL,req.body.description)
  //  updateProduct.save()
  // res.redirect('/admin/products')

  // Product.updateProductData(updatedProduct,productID,(product)=>{
  //   res.render('admin/products',{prods:product,path:'/admin/products',pageTitle:"Admin Products"})
  // })
console.log(req.body.productID)
  Product.findByPk(req.body.productID).then((product)=>{
     product.title=req.body.title
    product.price=req.body.price
    product.imageURL=req.body.imageURL
    product.description=req.body.description
        
    product.save()
  }).then((result)=>{
    console.log(result)
    // res.render('admin/products',{prods:result,path:'/admin/products',pageTitle:"Admin Products"})
    res.redirect('/admin/products')
  })
  .catch((error)=>{
    console.log(error)
  })

}



exports.getAdminProductsPage=(req,res)=>{
   
    // Product.fetchAll((product)=>{
    //     res.render('admin/products',{prods:product,path:'/admin/products',pageTitle:"Admin Products"})
    // })
    

    Product.findAll().then((product)=>{
      //console.
      res.render('admin/products',{prods:product,path:'/admin/products',pageTitle:'Admin Products'})
    }).catch((err)=>{
      console.log(err)
    })
  
  }


  exports.getEditProduct=(req,res)=>{

    const editMode=req.query.edit

    Product.findByPk(req.params.ProductID).then((result)=>{
      if(!result){
        return res.redirect('/')
      }
      res.render('admin/edit-product',{product:result, pageTitle:"Update Product", path : "/admin/edit-product", editMode:editMode})

    }).catch(err=>console.log(err))
     
    // Product.getProduct(req.params.ProductID,(product)=>{

    // res.render('admin/edit-product',{product:product, pageTitle:"Update Product", path : "/admin/edit-product", editMode:editMode})

    // })

  }

exports.deleteProduct=(req,res)=>{
    // Product.deleteBook((product)=>{
    //     res.render('/admin/products',{prods:product,path:'/admin/products',pageTitle:'Admin Products'})
    // }
    // Product.fetchAll((product)=>{
    //     console.log(req.title)
    //     res.render('admin/products',{prods:product,path:'/admin/products',pageTitle:"Admin Products"})
    // 

    // Product.deleteBook(req.params.title,(product)=>{

    //     res.render('admin/products',{prods:product,path:'/admin/products',pageTitle:"Admin Products"})
    // })
   // res.send("Hii ")


   Product.findByPk(req.params.productID).then((result)=>{
    console.log(req.params.productID)
    console.log(result)
return result.destroy()
   }).then((result)=>{
    console.log("Deleted the product")
    res.redirect('/admin/products')
   }).catch((err)=>{
    console.log(err)
   })
}


  
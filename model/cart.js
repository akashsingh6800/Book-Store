const fs=require('fs')
const path=require('path')
const rootDir=require('../utils/path')
const p = path.join(rootDir,'data','cart.json')
module.exports= class Cart{
    static addProduct(id,price){
        //Fetch the previous cart
        // Analyze the cart => find the exiting product
        // Add new product increase quantity

        fs.readFile(p,(err,fileContent)=>{
            let cart={product:[], totalPrice:0}
            if(!err){
                cart=JSON.parse(fileContent)
            }
            const existingProductIndex = cart.product.findIndex(prod=> prod.id===id)
            if(existingProductIndex!=-1){
                cart.product[existingProductIndex].qty+=1
            }
            else{
                cart.product.push({id:id,qty:1})
            }
         //   cart.product.push(id)
            cart.totalPrice=cart.totalPrice+ +price

            fs.writeFile(p,JSON.stringify(cart),(err)=>{

                    console.log(err)
                })

        })
    }

static deleteProduct(id,price){
    fs.readFile(p,(err,fileContent)=>{
        let cart={}
        if(!err){
            cart=JSON.parse(fileContent)
        }

        const existingProductIndex = cart.product.findIndex(prod=> prod.id === id)

        if(existingProductIndex!=-1){

            const productquantity=cart.product[existingProductIndex].qty
            cart.totalPrice-=productquantity*price
            cart.product.splice(existingProductIndex,1)

            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err)
            })

        }




    })
    
}


static getProduct(cb){

    fs.readFile(p,(err,fileContent)=>{
        const cart=JSON.parse(fileContent)
        if(err){
            cb(null)
        }
        else{
            console.log("Printing Cart")
            console.log(cart)
            cb(cart)
        }



    })

}

// static RemoveProduct(cb){

//     fs.readFile(p,(err,fileContent)=>{
//         const cart=JSON.parse(fileContent)
//         const newCart=
//         if(!err){
            
//         }

//     })

// }
   
}
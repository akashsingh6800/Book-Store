const getDb=require('../utils/database').getDb
const mongodb=require('mongodb')
class Product{


    constructor(title,price,imageURL,description, _id=null,UserId){
        this.title=title
        this.price=price
        this.imageURL=imageURL
        this.description=description
        if(_id){
        this._id=new mongodb.ObjectId(_id)
        }
        this.UserId=UserId
    }
    save(){
        const db=getDb()
        let dbOb;
        if(this._id){
            //update
            dbOb = db.collection('products').updateOne({_id: this._id}, {$set : this});
        }
        else{
            dbOb= db.collection('products').insertOne(this)
        }
        return dbOb.then(result=>{
            console.log(result)
        }).catch(err=>{
            console.log(err)
        })
    }

    static fetchAll(){
        const db = getDb()
        return db.collection('products').find().toArray().then(products=>{
          //  console.log(products)
            return products
        });
    }

    static getProduct(prodId){
        const db = getDb()
        console.log("Before prod id print")
        console.log(prodId)
        console.log("After prod id print")
        return db.collection('products').find({_id:new mongodb.ObjectId(prodId)}).toArray().then(product=>{
            console.log(product)
            return product
        })

    }

    static deleteProduct(prodId){
        const db = getDb()

        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)}).then(result=>{
            console.log(result)
        }).catch(err => { 
            console.log(err)
        })
    }
}

module.exports=Product































// const Sequelize = require('sequelize')

// const sequelize = require('../utils/database')


// const Product=sequelize.define('product',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey:true,
//         allowNull: false
//     },
//     title:Sequelize.STRING,
//     description:{
//         type:Sequelize.STRING,
//         allowNull: false
//     },
//     price:{
//         type:Sequelize.DOUBLE,
//         allowNull:false
//     },
//     imageURL:{
//         type:Sequelize.STRING,
//         allowNull: false
//     }

// })

// module.exports = Product











// const db=require('../utils/database').pool

// module.exports=class Product{

//     constructor(id,title,price,imageURL,description){
//         this.id=id;
//         this.title=title
//         this.price=price;
//         this.imageURL=imageURL;
//         this.description=description;
//     }

//     save(){
//       return (db.execute('INSERT INTO Products (title,price,description,imageURL) VALUES (?,?,?,?)',
//         [this.title,this.price,this.description,this.imageURL]))
//     }
//     static fetchAll(){
//         return db.execute('SELECT* FROM Products');
//     }

//     static getProduct(id){

      
//         return db.execute('SELECT * FROM Products WHERE Products.ID=?',[id])

//     }

// }

// /*//const products=[]
// const fs=require('fs')
// const path=require('path')
// const rootDir=require('../utils/path')
// const { get } = require('http')
// const p=path.join(rootDir,'data','products.json')

// const cart=require('./cart')
// const getAllProduct =(cb)=>{
   
//     //let product=[]
//     fs.readFile(p,(err,fileContent)=>{
//         if (err) 
//         {
//             cb([])
//         //return product
//         }
//        // console.log(JSON.parse(fileContent))
//        else{
//          cb(JSON.parse(fileContent))
//        }
//     })

//    // return []
//  }



// module.exports=class Product{
//    // id=1
//  constructor(id,title,price,imageURL,description){
//     this.id=id
// this.title=title;
// this.price=price;
// this.imageURL=imageURL;
// this.description=description


//  }
//  save(){
   
//     if(this.id){

//         getAllProduct((product)=>{
//             const productIndex=product.findIndex((val)=>{
//                                return val.id==this.id
                
//                            })
//             product[productIndex]=this
//             fs.writeFile(p,JSON.stringify(product),(err)=>{

//                 console.log(err)
//             });
//         })

//     }
//     else{
//         this.id=Math.random()
        
//         getAllProduct((product)=>{
//         product.push(this)
//         fs.writeFile(p,JSON.stringify(product),(err)=>{

//             console.log(err)
//         });

//     })
// }
//     ///products.push(this)
//  }
//  static fetchAll(cb){
//     getAllProduct(cb);

//  }


//  static getProduct(id,cb){

//     getAllProduct((product)=>{
//         //const Product = JSON.parse(fileContent)
//         product.forEach((val)=>{
//             if(val.id==id){
//                 return cb(val)
//             }

//         })

//     })
//  }

// //  static updateProductData(updatedProduct,productID,cb){

// //         getAllProduct((product)=>{
// //             const productIndex=product.findIndex((val)=>{
// //                 return val.id==productID

// //             })
// //             console.log(productIndex)
// //            updatedProduct.id=product[productIndex].id
// //            product[productIndex]=updatedProduct
// //            fs.writeFile(p,JSON.stringify(product),(err)=>{
// //             if(!err){
// //                 cb(product)
// //             }

            
// //          });
            
// //             })

// //         }


 
//  static deleteBook(title,cb){
//     fs.readFile(p,(err,fileContent)=>{
//     if(err){
//         cb([])
//     }   
//     else{
//         const ProductList=JSON.parse(fileContent)
//         const product=ProductList.find(prod => prod.id==title)
//         ProductList.forEach((obj,index)=>{

//             if(obj.id==title){
//                 ProductList.splice(index,1)
//             }
//         })
//         fs.writeFile(p,JSON.stringify(ProductList),(err)=>{
//             if(!err){
//                 console.log("In Delete Cart item")
//                 cart.deleteProduct(title,product.price)
//             }
//             console.log(err)
//         });
//         cb(ProductList)
//     }


//     })

//  }
// }
// */

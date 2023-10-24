const Product= require('./product')

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        require:true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart:{
        items:[{productID:{type: Schema.Types.ObjectId, ref:'Product' , required: true}, quantity:{ type: Number, required: true}}]
    }


})


userSchema.methods.addToCart=function(product){
    console.log("Before product print")
    console.log(product)
    console.log("After product print")
     let newQuantity=1
        const updateCartItem=[...this.cart.items]
        const cartProductIndex=this.cart.items.findIndex(cp=>{
            return cp.productID.toString() === product._id.toString()
        })

        if(cartProductIndex>=0){
            newQuantity=this.cart.items[cartProductIndex].quantity+1
            updateCartItem[cartProductIndex].quantity=newQuantity
        }
        else{
            updateCartItem.push({productID: product._id, quantity:1})
        }

        const updatedCart={items:updateCartItem}

        this.cart=updatedCart
        return this.save()


}

userSchema.methods.removeFromCart=function(prodID){
    const updatedCartItems= [...this.cart.items];

        const findIndex=updatedCartItems.findIndex(p=>{
            return p.productID.toString() === prodID.toString()
        })
        console.log(findIndex)
        if(findIndex>=0){
            updatedCartItems.splice(findIndex,1)
        }
    
        const updatedCart={items:updatedCartItems}
        this.cart=updatedCart
        console.log(updatedCart)

        return this.save()
}

userSchema.methods.DeleteCart=function(){

    this.cart= {items:[]}

    return this.save()
}

// userSchema.methods.getCart=function(){
//         console.log(this.cart.items)
//         const cartItems = this.cart.items
//         const products= cartItems.map(p=>{
//             return Product.findById(p.productID)
//         })
//         console.log("Before printing product")
//         console.log(products)
//         console.log("After Printing Product")

//        return products.map(p=>{
//             return{
//                 ...p,
//                 quantity: this.cart.items.find(i=>{
//                     return i.productID.toString() === p._id.toString()
//                 }).quantity
//             }
//         })

        

        
// }

module.exports= mongoose.model('User',userSchema);



// const getDb=require('../utils/database').getDb
// const mongodb=require('mongodb')
// class User{


//     constructor(name,email,contact,id,cart){
//         this.name=name
//         this.email= email
//         this.contact = contact
//         this._id=id
//         this.cart=cart
//     }

//     save(){
//         ///
//         const db =getDb()

//        return db.collection('user').insertOne(this).then(result=>{
//             console.log(result)
//         }).catch(err=>{ console.log(err)})

//     }
//     static findById(id){
//         const db = getDb()

//        return db.collection('user').find({_id: new mongodb.ObjectId(id)}).next()
//     }

//     addToCart(product){
//         //console.log(product._id)
//         let newQuantity=1
//         const updateCartItem=[...this.cart.items]
//         const cartProductIndex=this.cart.items.findIndex(cp=>{
//             return cp.ProductID.toString() === product._id.toString()
//         })

//         if(cartProductIndex>=0){
//             newQuantity=this.cart.items[cartProductIndex].quantity+1
//             updateCartItem[cartProductIndex].quantity=newQuantity
//         }
//         else{
//             updateCartItem.push({ProductID: product._id, quantity:1})
//         }

//         const updatedCart={items:updateCartItem}

//         const db=getDb()

//         return db.collection('user').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}}).then(result=>{
//             return result
//         });
//     }

//     getCart(){

//         const cartItems = this.cart.items
//         const db = getDb()
//         const productIds= cartItems.map(p=>{
//             return p.ProductID
//         })
//         return db.collection('products').find({_id:{$in:productIds}}).toArray().then(products=>{
//         return products.map(p=>{
//         return {
//           ...p,
//           quantity: this.cart.items.find(i=>{

//             return i.ProductID.toString() === p._id.toString()

//           }).quantity

//         }


//       })


//   })

//     }

//     DeleteProductFromCart(prodID){
//         const updatedCartItems= [...this.cart.items];
//         const db=getDb()
//         const findIndex=updatedCartItems.findIndex(p=>{
//             return p.ProductID.toString() === prodID.toString()
//         })
//         console.log(findIndex)
//         if(findIndex>=0){
//             updatedCartItems.splice(findIndex,1)
//         }
//         console.log(updatedCartItems)
//         const updatedCart={items:updatedCartItems}
//         console.log(prodID)
//         return db.collection('user').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}})
//     }

//     createOrder(){

        
//         const db=getDb()

//         const cartItems=this.cart.items
//         return this.getCart().then(products=>{
//             const orders={
//                 items:products,
//                 user:{
//                     _id: new mongodb.ObjectId(this._id),
//                     name:this.name
//                 }
//             }
//             return db.collection('order').insertOne(orders)
//         }).then(result=>{
//             return db.collection('user').updateOne({ _id: new mongodb.ObjectId(this._id)}, {$set:{ cart:{items:[]}}})
//         })
//     }

//     getOrder(){
//         const db = getDb()

//         return db.collection('order').find({'user._id': new mongodb.ObjectId(this._id)}).toArray();
//     }

    



// }



// exports.User=User
// // const Sequelize = require('sequelize')

// // const sequelize= require('../utils/database')


// // const user=sequelize.define('user',{
// //     id:{
// //         type:Sequelize.INTEGER,
// //         autoIncrement: true,
// //         primaryKey:true,
// //         allowNull: false

// //     },
// //     name:{
// //         type:Sequelize.STRING,
// //         allowNull:false
// //     },
// //     email:{
// //         type:Sequelize.STRING,
// //         allowNull:false
// //     }
    
// // })
// module.exports=user


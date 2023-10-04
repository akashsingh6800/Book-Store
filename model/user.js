
const getDb=require('../utils/database').getDb
const mongodb=require('mongodb')
class User{


    constructor(name,email,contact,id,cart){
        this.name=name
        this.email= email
        this.contact = contact
        this._id=id
        this.cart=cart
    }

    save(){
        ///
        const db =getDb()

       return db.collection('user').insertOne(this).then(result=>{
            console.log(result)
        }).catch(err=>{ console.log(err)})

    }
    static findById(id){
        const db = getDb()

       return db.collection('user').find({_id: new mongodb.ObjectId(id)}).next()
    }

    addToCart(product){
        //console.log(product._id)
        let newQuantity=1
        const updateCartItem=[...this.cart.items]
        const cartProductIndex=this.cart.items.findIndex(cp=>{
            return cp.ProductID.toString() === product._id.toString()
        })

        if(cartProductIndex>=0){
            newQuantity=this.cart.items[cartProductIndex].quantity+1
            updateCartItem[cartProductIndex].quantity=newQuantity
        }
        else{
            updateCartItem.push({ProductID: product._id, quantity:1})
        }

        const updatedCart={items:updateCartItem}

        const db=getDb()

        return db.collection('user').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}}).then(result=>{
            return result
        });
    }

    getCart(){

        const cartItems = this.cart.items
        const db = getDb()
        const productIds= cartItems.map(p=>{
            return p.ProductID
        })
        return db.collection('products').find({_id:{$in:productIds}}).toArray().then(products=>{
        return products.map(p=>{
        return {
          ...p,
          quantity: this.cart.items.find(i=>{

            return i.ProductID.toString() === p._id.toString()

          }).quantity

        }


      })


  })

    }

    DeleteProductFromCart(prodID){
        const updatedCartItems= [...this.cart.items];
        const db=getDb()
        const findIndex=updatedCartItems.findIndex(p=>{
            return p.ProductID.toString() === prodID.toString()
        })
        console.log(findIndex)
        if(findIndex>=0){
            updatedCartItems.splice(findIndex,1)
        }
        console.log(updatedCartItems)
        const updatedCart={items:updatedCartItems}
        console.log(prodID)
        return db.collection('user').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}})
    }

    createOrder(){

        
        const db=getDb()

        const cartItems=this.cart.items
        return this.getCart().then(products=>{
            const orders={
                items:products,
                user:{
                    _id: new mongodb.ObjectId(this._id),
                    name:this.name
                }
            }
            return db.collection('order').insertOne(orders)
        }).then(result=>{
            return db.collection('user').updateOne({ _id: new mongodb.ObjectId(this._id)}, {$set:{ cart:{items:[]}}})
        })
    }

    getOrder(){
        const db = getDb()

        return db.collection('order').find({'user._id': new mongodb.ObjectId(this._id)}).toArray();
    }

    



}



exports.User=User
// const Sequelize = require('sequelize')

// const sequelize= require('../utils/database')


// const user=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey:true,
//         allowNull: false

//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }
    
// })
// module.exports=user


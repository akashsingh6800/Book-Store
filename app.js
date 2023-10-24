const express = require('express');


const mongoConnect=require('./utils/database').mongoConnect
const path=require('path')
const User=require('./model/user')
const mongoose = require('mongoose')
const session=require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
// const Product = require('./model/product')
// const User = require('./model/user')
// const Cart = require('./model/cart')
// const CartItem = require('./model/cart-item')
// const Order = require('./model/order')
// const OrderItem = require('./model/order-item')

//const routeDir = require('./utils/path')

const MONGODB_URI = 'mongodb+srv://akashsingh6800:guyKmCX2R5Qc7VLZ@cluster0.fd4i3ci.mongodb.net/shop'
const app=express();
const store = new MongoDBStore({
 uri: MONGODB_URI, 
 collection: 'sessions'
});

 const pageNotFound=require('./controllers/pageNotFound')
 const adminRoutes=require('./routes/admin')
const shopRoutes=require('./routes/shop')
const authRoutes = require('./routes/auth')

// db.execute('SELECT * From products')
// .then((result)=>{clea
// console.log(result)
// })
// .catch((err)=>{
// console.log(err)
// })

app.set('view engine','ejs');
app.set('views','views');

// app.set('view engine','pug');//we want to compile dynamic template using pug 
// app.set('views','views');//here view we can set to tell where to find the templates


app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(session({secret:"my secret", saveUninitialized:false,resave:false, store:store}))


app.use((req,res,next)=>{
  if(!req.session.user){
    return next()
  }
User.findById(req.session.user._id).then(user=>{

  req.user= user;
  next()


}).catch(err=>{
  console.log(err)
})



})
app.use(flash());
app.use((req,res,next)=>{

  res.locals.isAuthenticated = req.session.isLoggedIn;
  next()
})

// app.use((req,res,next)=>{

//   User.findById("652aabc06af76cfbb87370a5").then(user=>{
//     req.user=user
  
//     next()
//   }).catch(err=>{ 
//     console.log(err)
//   })
//   // User.findByPk(1).then((user)=>{
//   //   req.user=user
//   //   next()
//   // }).catch((err)=>{
//   //   console.log(err)
//   // })

// })


 app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(pageNotFound.pageNotFound)




mongoose.connect("mongodb+srv://akashsingh6800:guyKmCX2R5Qc7VLZ@cluster0.fd4i3ci.mongodb.net/shop?retryWrites=true&w=majority").then(result=>{

//  User.findOne().then(user=>{
//   if(!user){
//     const user= new User({name: "Akash", email:"akashsingh6800@gmail.com", cart:{items:[]}})
//     user.save();
//   }
//  });

  app.listen(3000)
}).catch(err=>{
  console.log(err)
})


// mongoConnect(()=>{
//   // const user = new User('Akash Singh','akashsingh6800@gmail.com','7039855130')
//   // user.save().then(result=>{
//   //   app.listen(3000)
//   // })
//  app.listen(3000)
// })

// app.use('/add-products',(req,res)=>{
//     res.send("<form action='/product' method='POST'><input type='text' name='Add Product'> <button type='submit'> Add</button>")
//    console.log('In the /users middleware')
//    })

// app.use('/product',(req,res)=>{
// console.log(req.body)
// console.log("In /product middleware")

// })

// app.use('/',(req,res)=>{
//     console.log("In the middleware")
//     res.send('<h1>Hellow world</h1>') 
// })

// Product.belongsTo(User, {constraint: true, onDelete:'CASCADE'})
// User.hasMany(Product)
// User.hasOne(Cart)
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through : CartItem});
// Product.belongsToMany(Cart, {through : CartItem});
// Order.belongsTo(User);
// User.hasMany(Order)
// Order.belongsToMany(Product, {through : OrderItem})


// sequelize.sync({force:true}).then((result)=>{
//   //  console.log(result)
//     app.listen(3000,()=>{ console.log("Server listening on port 3000")})

// }).catch((error)=>{
//     console.log(error)
// })

// sequelize
// .sync()
// //.sync({force : true})
// .then((result)=>{

//   return User.findByPk(1)
//   //  console.log(result)
    

// }).then((user)=>{
//   if(!user){
//     return User.create({name:'Akash Singh', email:'akashsingh6800@gmail.com'})
//   }
//   return user
// })
// .then((user)=>{
//   return user.createCart();
// })
// .then((cart)=>{
//   app.listen(3000,()=>{ console.log("Server listening on port 3000")})
// })
// .catch((error)=>{
//     console.log(error)
// })



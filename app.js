const express = require('express');

const sequelize=require('./utils/database')
const path=require('path')

const Product = require('./model/product')
const User = require('./model/user')
//const routeDir = require('./utils/path')

const app=express();


const pageNotFound=require('./controllers/pageNotFound')
const adminRoutes=require('./routes/admin')
const shopRoutes=require('./routes/shop')

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

app.use((req,res,next)=>{
  User.findByPk(1).then((user)=>{
    req.user=user
    next()
  }).catch((err)=>{
    console.log(err)
  })

})


app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);

app.use(pageNotFound.pageNotFound)



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

Product.belongsTo(User, {constraint: true, onDelete:'CASCADE'})
User.hasMany(Product)

// sequelize.sync({force:true}).then((result)=>{
//   //  console.log(result)
//     app.listen(3000,()=>{ console.log("Server listening on port 3000")})

// }).catch((error)=>{
//     console.log(error)
// })

sequelize.sync().then((result)=>{

  return User.findByPk(1)
  //  console.log(result)
    

}).then((user)=>{
  if(!user){
    return User.create({name:'Akash Singh', email:'akashsingh6800@gmail.com'})
  }
  return user
}).then((user)=>{
  app.listen(3000,()=>{ console.log("Server listening on port 3000")})
}).catch((error)=>{
    console.log(error)
})



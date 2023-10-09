// const mongodb=require('mongodb')

// const MongoClient= mongodb.MongoClient;

// let _db;
// const mongoConnect=(callback)=>{

// MongoClient.connect('mongodb+srv://akashsingh6800:guyKmCX2R5Qc7VLZ@cluster0.fd4i3ci.mongodb.net/shop?retryWrites=true&w=majority').then(client=>{
// console.log("Connected Mnogo DB")    
// _db=client.db()
// callback()

// }).catch(err => console.log(err))

// }

// const getDb=()=>{
//     if(_db){
//         return _db
//     }
//     throw "No Database Fouce"
// }

// exports.mongoConnect=mongoConnect
// exports.getDb=getDb























// // const mysql = require('mysql2');


// // const pool=mysql.createPool({
// //     host:'localhost',
// //     user:'root',
// //     database:'node-complete',
// //     password:'Puma@123456789'
// // })

// // exports.pool=pool.promise()


// // const Sequelize = require('sequelize')

// // const sequelize = new Sequelize('node-complete','root','Puma@123456789',{dialect:'mysql',host:'localhost'});

// // module.exports=sequelize;
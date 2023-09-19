// const mysql = require('mysql2');


// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-complete',
//     password:'Puma@123456789'
// })

// exports.pool=pool.promise()


const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete','root','Puma@123456789',{dialect:'mysql',host:'localhost'});

module.exports=sequelize;
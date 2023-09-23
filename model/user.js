const Sequelize = require('sequelize')

const sequelize= require('../utils/database')


const user=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false

    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    }
    
})
module.exports=user


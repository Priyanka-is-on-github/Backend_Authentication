//create a model

const {Model , DataTypes}= require("sequelize"); 

const sequelize = require("../config/db"); 

class User extends Model{}

User.init(           //create table 
    {
        name:{
            type:DataTypes.STRING,  
        },
        email:{
            type:DataTypes.STRING,
        },
        password:{
            type:DataTypes.STRING, 
        },
        

    },
    {
        sequelize,modelName:"user" 
    }
)
module.exports = User;
// DB is created

const {Sequelize} = require("sequelize"); 

const createDB = new Sequelize("test-db" , "user","password",{ 
    dialect:"sqlite",
    host:"./config/db.sqlite", 
});

module.exports= createDB; 
const express = require("express");

const router = express.Router();  //here express is an object and Rounter is a method of that object 

const bcrypt = require("bcrypt"); 

const createDB = require("../config/db.js");

const {validateName, validateEmail, validatePassword} = require("../utils/validators.js");

const User = require("../models/userModels");

createDB.sync().then(()=>{ //DB connectivity
    console.log("DB is running");   
})

router.post("/signUp", async (req, res)=>{  
    try {
      
        const {name, email, password }=req.body;  
       
       // const userExist = users.hasOwnProperty(email);  //it will return only true or false

       const userExist= await User.findOne({
        where:{
            email:email
        }

       })

        if(userExist)
        {
           return res.status(403).json({ status:"error", text:"user exists, please do signIn" }); 
        }
        if(!validateName(name))
        {
           return res.status(400).json({status:"error", text:"Invalid user name:name must be longer than two character and must not include number and special character"});
        }

        if(!validateEmail(email))
        {
           return res.status(400).json({status:"error", text:"Invalid email"});
        }

        if(!validatePassword(password))
        {
           return res.status(400).json({status:"error", text:"Invalid password: password must be atleast 8 characters long and must include one uppercase letter, one lowercase latter, one digit, one spacial character "});
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        console.log("password",hashedpassword);

        // users[email]={name,password: hashedpassword}; 
        // console.log(users);

        const saveToDB = { 
            name, email, password:hashedpassword
        }
        
       
        const createdUser = await User.create(saveToDB)//insert data into db

        // async function deleteAllUsers() {
        //     try {
        //      const deleted =await User.destroy({
        //         where: {}, // Empty where clause deletes all rows
        //         truncate: true, // Truncate table (reset auto-increment primary key)
                
        //       });
        //       console.log('All users deleted successfully.', deleted);
        //     } catch (error) {
        //       console.error('Error deleting users:', error);
        //     }
        //   }
          
        //   // Call the function to delete all users
        //   deleteAllUsers();

        //    const data = await User.findAll();
        // console.log(data)
        
       
        res.status(201).json({status:"ok", text:"Profile created, successfully! now do singin"});                  //200 means ok, 201 means modified, whch status code start from 2 it means (ok)at backend

       

    } catch (error) {
       
        return res.status(500).send(error.message);                //500 or 501 it tell somthing is wrong at backend 
        
    }
})


router.post("/signIn", async (req, res)=>{ 
    try {
       const {email, password}=req.body;
       
       const userExist = await User.findOne({
        where:{
            email:email,
        }
       })
     

       if(!userExist){
        return res.json({status:"error", text:"User does not exist ,please first signup"}); 
       }

       const passMatch= await bcrypt.compare(password, User[email].password); //for authenication , is that a same user or not?

       if(!passMatch){
        res.json({status:"error", text:"Invalid Password "}); 
       }

      return res.json({status:"ok", text:"SignIn successful"});

    } catch (error) {
        
        res.send(error);
    }
})


module.exports = router;


// router.get("/greet" , (req, res)=>{
//  res.send("Hi priyanka ");
// })
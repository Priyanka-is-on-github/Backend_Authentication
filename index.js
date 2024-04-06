const express =  require("express");

const cors=require("cors");  

const path = require("path");
 

const staticPath = path.join(__dirname,"public");
// CORS stands for Cross-Origin Resource Sharing. It's a mechanism implemented by web browsers to allow or restrict requests made from one origin (domain, protocol, or port) to another origin. 


const router = require("./routes/authRoutes");  

const app = express(); //here express method return a object, which is assign to app, and now app is an object which contains multiple methods, like use,listen etc.
app.use(cors());

const PORT = 1326;     
//accept json
app.use(express.json());
                                                //these are middleware app.use()
//accept body
app.use(express.urlencoded({extended: true}));  
//use the html
app.use(express.static(staticPath));   //here we are sending a static file which resides in public folder that way we r using express.static("public")

app.use("/api/v1",router)   //create api
 
app.listen(PORT, ()=>{
    console.log("App is running at port=",PORT); 
});


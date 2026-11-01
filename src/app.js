const express=require("express");
const {adminauth}=require("../utils/auth");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");

app.post("/signup",async(req,res)=>{
    //creating a new instance of the User model and saving it to the database
    const user=new User({
        firstName:"Virat",
        lastName:"Kumar",
        emailId:"viratkumar@example.com",
        password:"password123",
    });

    try{
        await user.save();
        res.send("User created successfully");
    }catch(err){
        res.status(500).send("Error creating user");
    }
   

})

connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log("server is running ")
});
}).catch(err=>{
    console.log("Error in connecting to database",err);
})


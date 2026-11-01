const express=require("express");
const {adminauth}=require("../utils/auth");
const app=express();

//request handler
app.get("/getUserdata",(req,res)=>{
    //Logic of db call and get user data

    throw new Error("Error in getting user data");
    res.send("User data sent");
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
})

app.listen(3000,()=>{
    console.log("server is running ")
});
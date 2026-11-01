const express=require("express");
const {adminauth}=require("../utils/auth");
const app=express();

//request handler
app.use("/admin/userdata",adminauth,(req,res)=>{
    res.send("userdata");
});
app.use("/admin/deleteuser",adminauth,(req,res)=>{
    res.send("deleteuser");
});


app.listen(3000,()=>{
    console.log("server is running ")
});
const express=require("express")
const requestRouter=express.Router();
const {userAuth}=require("../../utils/auth")  

requestRouter.post("/sendConnection",userAuth,async (req,res)=>{

    //sending a connection request
    console.log("sending a connection request")

    res.send("Connect request sent")
})

module.exports=requestRouter
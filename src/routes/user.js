const express=require("express");
const { userAuth } = require("../../utils/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const userRouter=express.Router();


//get all the pending connection request for the logged in User
userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    
    try{
        const loggedInUser=req.user;

        const connectionrequest= await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"]);


        res.json({
            message:"Data fetched successfully!!",
            data:connectionrequest
        })
    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
    
    
})


module.exports=userRouter;

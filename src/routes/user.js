const express=require("express");
const { userAuth } = require("../../utils/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter=express.Router();


//get all the pending connection request for the logged in User
userRouter.get("/user/requests/received",userAuth,async (req,res)=>{
    
    try{
        const loggedInUser=req.user;

        const connectionrequest= await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName photoUrl gender age about skills");
        //.populate("fromUserId",["firstName","lastName"]);


        res.json({
            message:"Data fetched successfully!!",
            data:connectionrequest
        })
    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
    
    
})

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user;

        const connectionrequest=await ConnectionRequestModel.find({
            $or: [
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId","firstName lastName skills about age gender photoUrl").populate("toUserId","firstName lastName skills about age gender photoUrl")


        const data=connectionrequest.map((row)=> {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
               return row.toUserId
            }
            return row.fromUserId
        })

        res.json({data: data})
    }catch(err){
        res.status(400).send("ERROR: " + err.message)    
    }
})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        //User should see all other user cards except
        // 0. his own card
        // 1. his connections
        // 2. ignored people
        // 3. already sent the connection request

        const loggedInUser=req.user;

        //find all the connection request (sent+received)
        const connectionrequests = await ConnectionRequestModel.find({
            $or:[
                {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId")


        const hideUsersFromFeed= new Set();
        connectionrequests.forEach(req=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        const users= await User.find({
            $and:[
            {_id:{$nin:Array.from(hideUsersFromFeed)}},
            {_id:{ $ne:loggedInUser._id}}
        ]
        }).select("firstName lastName  about skills photoUrl");

        res.send(users);


    }catch(err){
        res.status(400).json({messsage:err.message})
    }
})


module.exports=userRouter;

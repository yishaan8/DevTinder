const express=require("express")
const User=require("../models/user");
const profileRouter=express.Router();
const {userAuth}=require("../../utils/auth") 
const {validateProfileEditData}=require("../helper/validation") 

profileRouter.get("/profile",userAuth,async (req,res)=>{
    try{
    
        const user=req.user; 

        res.send(user)
    
    }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try{
    if(!validateProfileEditData(req)){
        throw new Error("Invalid edit request");
    }
    const loggedInUser=req.user;
    
    Object.keys(req.body).forEach(key=> (loggedInUser[key]=req.body[key]));

    await loggedInUser.save();

    res.json(
        {
            message:`${loggedInUser.firstName}, your Profile was updated succesfully`,
            data:loggedInUser
        }
        );
}catch(err){
    res.status(400).send("ERROR" + err.message)
}
})

module.exports=profileRouter
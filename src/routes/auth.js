const express=require("express")
const User=require("../models/user")
const authRouter=express.Router();
const validatesignupdata=require("../helper/validation");
const bcrypt=require("bcrypt");


authRouter.post("/signup",async(req,res)=>{
    //validatation of data 
    try{
        validatesignupdata(req);

        const {firstName,lastName,emailId,password}=req.body;

    //Encrypt the password before saving it to the database
        // we will use bcryptjs library to encrypt the password before saving it to the database.
        const passwordHash= await bcrypt.hash(password,10); // 10 is the number of rounds to be used for hashing the password. The higher the number, the more secure the password will be but it will take more time to hash the password.
        


    //creating a new instance of the User model and saving it to the database
        const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });
        await user.save();
        res.send("User created successfully");
    }catch(err){
        res.status(500).send("ERROR : " + err.message);
    }
   

})


authRouter.post("/login",async (req,res)=>{
    try{
        const{emailId,password}=req.body;
        
        const user=await User.findOne({emailId:emailId});
        if(!user){
            return res.status(404).send("Invalid credentials");
        }

        const isPasswordValid= await user.validatePassword(password)
        if(isPasswordValid){

            //create a JWT token for the user 
            const token = await user.getJWT();
            

            //Add the token to cookie and send the response to the client 
            res.cookie("token",token);
            res.send("Login successful");
        }else{
            res.status(401).send("Invalid credentials");
        }

    }catch(err){
        res.status(400).send("ERROR :"+ err.message)
    }
}) 



module.exports=authRouter
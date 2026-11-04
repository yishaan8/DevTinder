const jwt=require("jsonwebtoken")
const User=require("../src/models/user")


const userAuth=async (req,res,next)=>{
    // READ the token from the req.cookie
    try{ 
    const cookie=req.cookies;
    const{token}=cookie;
    if(!token){
        throw new Error("Token is not valid")
    }

    //validate the token
    const decodeddata= await jwt.verify(token,"DEV@TINDER")
    
    const{_id}=decodeddata;
    
    //find the user
    const user=await User.findById(_id);
    if(!user){
        throw new Error("User not found")
    }
    req.user=user;
    next();
}catch(err){
    res.status(400).send("ERROR: "+err.message)
}
};

module.exports={
    userAuth
};
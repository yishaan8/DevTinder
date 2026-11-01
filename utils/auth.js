const adminauth=(req,res,next)=>{
    console.log("admin auth middleware");
    const token="xyz";
    const authtoken="xyzzzz";
    if(authtoken!=token){
        res.status(401).send("Not authorized");
    }else{
        next();
    }
};

module.exports={
    adminauth
};
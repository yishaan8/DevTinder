const express=require("express");
const {adminauth}=require("../utils/auth");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");

app.use(express.json());

app.post("/signup",async(req,res)=>{
    //creating a new instance of the User model and saving it to the database
    const user=new User(req.body);

    try{
        await user.save();
        res.send("User created successfully");
    }catch(err){
        res.status(500).send("Error creating user");
    }
   

})

// GET user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
       const user= await User.find({emailId:userEmail});
       if(user.length===0){
        return res.status(404).send("User not found");
       }else{
        res.send(user);
       }
    }
    catch(err){
        res.status(500).send("Error fetching user");
    }
})

//Feed API- GET /feed -get all the users from the database and return them in the response
app.get("/feed",async (req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("Something went wrong");
    }
})

//delete a user from the database
app.delete("/user",async (req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);3
        res.send("User deleted successfully");
    }catch(err){
        res.status(500).send("Error deleting user");
    }
});

//update data of the user
app.patch("/user",async (req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        await User.findByIdAndUpdate({_id:userId},data);
        res.send("User updated successfully");
    }catch(err){
        res.status(500).send("Error updating user");
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


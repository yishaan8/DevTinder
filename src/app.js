const express=require("express");
const {adminauth}=require("../utils/auth");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
const validatesignupdata=require("./helper/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken"); 
const {userAuth}=require("../utils/auth")  

app.use(express.json());
app.use(cookieParser()); // Add this line to use cookie-parser middleware

const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/requests")

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter)





connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
    console.log("server is running ")
});
}).catch(err=>{
    console.log("Error in connecting to database",err);
})


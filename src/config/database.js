const mongoose=require("mongoose");


const connectDB = async()=>{
await (
    mongoose.connect("mongodb+srv://yishaan:ishaan1406@cluster0.nfcegku.mongodb.net/devTinder")
);
};


module.exports=connectDB;
const mongoose=require("mongoose"); 
const User = require("./user");

const connectionRequestSchema=new mongoose.Schema({
    
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",  //reference to the user collection
        required:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type: String,
        enum:{
            values:["ignored","interested","accepted","rejected"]
        },
        required:true
    }
},{
    timestamps:true
}
);

//ConnectionRequest.find(fromUserId:2342356546, toUserId:54879674969208)
connectionRequestSchema.index({fromUserId : 1,toUserId:1});

connectionRequestSchema.pre("save", function() {
    const connectionRequest = this;

    // Check if the sender and receiver are the same
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send Connection request to yourself!");
    }
});

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports=ConnectionRequestModel
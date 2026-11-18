const mongoose=require("mongoose") 

const connectionRequestSchema=new mongoose.Schema({
    
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type: String,
        enum:{
            values:["ignore","interested","accepted","rejected"]
        },
        required:true
    }
},{
    timestamps:true
}
);

//ConnectionRequest.find(fromUserId:2342356546, toUserId:54879674969208)
connectionRequestSchema.index({fromUserId : 1,toUserId:1});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //check if the fromUserId is same as toUserId

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send Connection request to yourself!")
    }
    next();

})

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema)

module.exports=ConnectionRequestModel
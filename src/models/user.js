const mongoose = require('mongoose');
const validator = require('validator');

const userSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required:true, // if first name is not there then mongoose will not allow to save the data in the database.
        maxLength: 50, // maximum length of the first name is 50 characters.
        minLength: 2, // minimum length of the first name is 2 characters.
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required:true,
        unique:true, // if email id is already there in the database then mongoose will not allow to save the data in the database.
        lowercase:true, // convert the email id to lowercase before saving it in the database.
        trim:true, // remove the white spaces from the email id before saving it in the database.
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid :" + value);
            }
        }
    },
    password:{
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough");
            }
        }
    },
    age:{
        type: Number,
        min: 18, // minimum age is 18
    },
    gender:{
        type: String,
        validate(value){ // custom validation for gender field
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,        
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL is not valid "+value)
            }
        }
    },
    about:{
        type:String,
        default:"Hey there! I am using DevTinder"
    },
    skills:{
        type:[String]
    }
},
{timestamps:true} // this will create two fields in the database createdAt and updatedAt which will store the time when the user was created and updated respectively.
);

const User=mongoose.model("User",userSchema);

module.exports=User;
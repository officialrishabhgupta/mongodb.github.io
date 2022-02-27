const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({   
    name:{
        type:String,
        required:true,
        lowercase:true,
        minlength:[3,"minimum 3 letters"],
        maxlength:[25,"maximum 25 letters"],
        trim:true
    },
    lang:{
        type:String,
        required:true,
        trim:true
    },
    member_since:{
        type:Number,
        required:true,
        validate(value){
            if(value < 0){
                throw new Error("member_since can't be negative")
            }
        }
    }


})

const User = new mongoose.model("User",userSchema)

module.exports = User;
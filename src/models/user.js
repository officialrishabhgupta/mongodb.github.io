const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({   
    name:{
        type:String,
        required:true,
    },
    lang:{
        type:String,
        required:true,
    },
    member_since:{
        type:Number,
        required:true,
    },

})

const User = new mongoose.model("User",userSchema)

module.exports = User;
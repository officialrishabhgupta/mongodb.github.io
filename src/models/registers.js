const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const registerSchema = new mongoose.Schema({   
    name:{
        type:String,
        required:true,
        minlength:[3,"minimum 3 letters"],
        maxlength:[25,"maximum 25 letters"],
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    city:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }]
})

//generating tokens
registerSchema.methods.generateAuthToken = async function(){
    try{
        console.log(this.id);
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (err){
        res.send("the error part is" + err );
        console.log("the error part is" + err );
    }
}

//converting password into hash
registerSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password,10);
    }
    next();
})

const Register = new mongoose.model("Register",registerSchema)

module.exports = Register;
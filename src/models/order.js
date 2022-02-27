const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({   
    name:{
        type:String,
        required:true,
        trim:true
    },
    orderID:{
        type:Number,
        required:true,
        unique:true,
        validate(value){
            if(value < 0){
                throw new Error("orderID can't be negative")
            }
        }
    },
    productID:{
        type:Number,
        required:true,
        validate(value){
            if(value < 0){
                throw new Error("productID can't be negative")
            }
        }
    },
    quantity:{
        type:Number,
        required:true,
        validate(value){
            if(value < 0){
                throw new Error("quantity can't be negative")
            }
        }
    },
})

const Order = new mongoose.model("Order",orderSchema)

module.exports = Order;
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({   
    name:{
        type:String,
        required:true,
    },
    orderID:{
        type:Number,
        required:true,
    },
    productID:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
})

const Order = new mongoose.model("Order",orderSchema)

module.exports = Order;
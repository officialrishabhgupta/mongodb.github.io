const order = require("../models/order");

const getOrders = async (req,res)=>{
    try{
        const getOrders = await order.find({}).sort({"orderID":1});
        res.send(getOrders);
    }catch(e){
        res.status(400).send(e);
    }
}

const postOrder =async(req,res)=>{
    try{
        const addingOrder = new order(req.body)
        console.log(req.body);
        const insertOrder =await addingOrder.save();
        res.status(201).send(insertOrder);
    }catch(e){
        res.status(400).send(e);
    }
}

const getOrder =async(req,res)=>{
    try{
        const _id = req.params.id;
        const getOrder = await order.findById({_id});
        res.send(getOrder);
    }catch(e){
        res.status(400).send(e);
    }
}

const patchOrder = async(req,res)=>{
    try{
        const _id = req.params.id;
        const getOrder = await order.findByIdAndUpdate(_id,req.body,{new:true});
        res.send(getOrder);
    }catch(e){
        res.status(500).send(e);
    }
}

const deleteOrder =async(req,res)=>{
    try{
        const getOrder = await order.findByIdAndDelete(req.params.id);
        res.send(getOrder);
    }catch(e){
        res.status(500).send(e);
    }
}

module.exports ={
    getOrders,
    postOrder,
    getOrder,
    patchOrder,
    deleteOrder
};
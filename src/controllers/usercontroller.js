const user= require("../models/user");

const getUsers = async (req,res)=>{
    try{
        const getUsers = await user.find({}).sort({"membersince":1});
        res.send(getUsers);
    }catch(e){
        res.status(400).send(e);
    }
}

const postUser =async(req,res)=>{
    try{
        const addingUser = new user(req.body)
        console.log(req.body);
        const insertUser =await addingUser.save();
        res.status(201).send(insertUser);
    }catch(e){
        res.status(400).send(e);
    }
}

const getUser =async(req,res)=>{
    try{
        const _id = req.params.id;
        const getUser = await user.findById({_id});
        res.send(getUser);
    }catch(e){
        res.status(400).send(e);
    }
}

const patchUser = async(req,res)=>{
    try{
        const _id = req.params.id;
        const getUser = await user.findByIdAndUpdate(_id,req.body,{new:true});
        res.send(getUser);
    }catch(e){
        res.status(500).send(e);
    }
}

const deleteUser =async(req,res)=>{
    try{
        const getUser = await user.findByIdAndDelete(req.params.id);
        res.send(getUser);
    }catch(e){
        res.status(500).send(e);
    }
}

module.exports ={
    getUsers,
    postUser,
    getUser,
    patchUser,
    deleteUser
};
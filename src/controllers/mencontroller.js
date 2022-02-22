const MenRanking = require("../models/men");

const getMen = async (req,res)=>{
    try{
        const getMen = await MenRanking.find({}).sort({"ranking":1});
        res.send(getMen);
    }catch(e){
        res.status(400).send(e);
    }
}

const postMan =async(req,res)=>{
    try{
        const addingMenRecords = new MenRanking(req.body)
        console.log(req.body);
        const insertMen =await addingMenRecords.save();
        res.status(201).send(insertMen);
    }catch(e){
        res.status(400).send(e);
    }
}

const getMan =async(req,res)=>{
    try{
        const _id = req.params.id;
        const getMan = await MenRanking.findById({_id});
        res.send(getMan);
    }catch(e){
        res.status(400).send(e);
    }
}

const patchMan=async(req,res)=>{
    try{
        const _id = req.params.id;
        const getMan = await MenRanking.findByIdAndUpdate(_id,req.body,{new:true});
        res.send(getMan);
    }catch(e){
        res.status(500).send(e);
    }
}

const deleteMan =async(req,res)=>{
    try{
        const getMan = await MenRanking.findByIdAndDelete(req.params.id);
        res.send(getMan);
    }catch(e){
        res.status(500).send(e);
    }
}

module.exports ={
    getMen,
    postMan,
    getMan,
    patchMan,
    deleteMan
};
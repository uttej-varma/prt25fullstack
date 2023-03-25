const express=require("express");
const router=express.Router();
const bodyparser=require("body-parser");
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());
const NOTE=require("../models/Note");

///creating a note after successfull authentication
router.post("/note",async(req,res)=>{
    try{
        const data=await NOTE.create({
            title:req.body.title,
            description:req.body.description,
            user:req.user
        })
        res.status(201).json({
            message:"post created successfully",
            data
        })
    }
    catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})
//getting only user notes
router.get("/note/:id",async (req,res)=>{
    try{
         const data=await NOTE.find({user:req.params.id});
         res.status(200).json({
            message:"user notes fetched",
            data
         })
    }
    catch(e){
         res.status(400).json({
            message:e.message
         })
    }
})
//updating a note after successfull authentication
router.put("/note/:id",async (req,res)=>{
    const data=await NOTE.findByIdAndUpdate(req.params.id,req.body,{new:true});
   if(data){
    res.status(201).json({
        message:"updated successfully",
        data
    })
   }
   else{
    res.status(400).json({
        message:"no data found",
    })
   }
})
//delete a particular note
router.delete("/note/:id", async (req,res)=>{
    try{
        const data=await NOTE.deleteOne({_id:req.params.id});
    res.status(200).json({
        message:"deleted successfully"
    })
    }
    catch(e){
        res.status(400).json({
            message:e.message
        }) 
    }
})
//delete all notes
module.exports=router;
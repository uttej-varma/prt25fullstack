const USER=require("../models/User");
const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const env=require("dotenv");
env.config();
const bodyparser=require("body-parser");
router.use(bodyparser.json());
///Registering a user
router.post("/register",async (req,res)=>{
    try{
        const data=await USER.findOne({email:req.body.email});
        if(data)
        {
            return res.status(200).json({
                message:"User already registered"
            })
        }
        const {email,password}=req.body;
         bcrypt.hash(password,10,async function(err,hash){
            if(err){
                return res.status(500).json({
                    message:err.message,
                    status:"failed"
                })
            }
            const dataAfterHash=await USER.create({
                email,
                password:hash
            })
            res.status(201).json({
                message:"successfully registered",
                dataAfterHash
            })
         })


    }
    catch(e){
             res.status(400).json({
                message:e.message
             })
    }
})
//login a valid user
router.post("/login",async (req,res)=>{
    try{
        const user=await USER.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(200).json({
                message:"user should register"
            })
        }
        const {email,password}=req.body;
        bcrypt.compare(password,user.password,function(err,result){
            if(err){
                return res.status(500).json({
                    message:err.message
                })
            }
            if(result){
                const token=jwt.sign({
                    exp:Math.floor((Date.now()/1000)*(60*60)) ,    ///expires in 60 minutes
                    data:user._id,   
                },process.env.SECRET);
                 res.status(200).json({
                    message:"user loggedin successfully",
                    id:user._id,
                    token

                })
            }
            else{
                res.status(200).json({
                    message:"invalid Credentials"
                })
            }
        })
    }
    catch(e){
          res.status(400).json({
            message:e.message
          })
    }
})
module.exports=router;
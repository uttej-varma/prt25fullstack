const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
const userSchema=new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    dateandtime:{type:String,default:Date()}
},{timestamps:true})
const userModel=mongoose.model("User",userSchema);
module.exports=userModel;
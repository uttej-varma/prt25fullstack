const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
const noteSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    dateandtime:{type:String,default:Date()},
    user:{type:ObjectId,ref:"User"}
},{timestamps:true})
const noteModel=mongoose.model("Note",noteSchema);
module.exports=noteModel;
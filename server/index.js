const express=require("express");
const app=express();
const conn=require("./connection/connect");
const cors=require("cors");
app.use(cors());
const env=require("dotenv");
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
conn();
const reglog=require("./routes/user");
const crudNote=require("./routes/note");
const tokenVerification=require("./verification/verify");

app.use("/api/v1/user",reglog);
app.post("/api/v1/usernote/note",(req,res,next)=>{
    tokenVerification(req,res,next);
});
app.use("/api/v1/usernote",crudNote);
app.listen(3300,()=>{console.log("running at 3300")});

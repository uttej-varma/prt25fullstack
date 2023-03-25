const mongoose=require("mongoose");
const env=require("dotenv");
env.config();
async function connect(){
    await mongoose.connect(process.env.MONGO_URL);
}
module.exports=connect;
import mongoose from "mongoose";
const leaderSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    score:{
        type:Number,
        required:true,
    },
 
})
const LeaderData = new mongoose.model('LeaderData',leaderSchema);
export default LeaderData


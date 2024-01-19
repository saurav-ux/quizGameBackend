import mongoose from "mongoose";
const quesSchema = mongoose.Schema({
    questions:{
        type:String,
        required:true,
    },
    // option should be array
    options: {
        type: [String], 
        required: true,
    },
    part:{
        type:Number,
        required:true,
    },
    marks:{
        type:Number,
        required:true, 
    }

})
const QuesData = new mongoose.model('QuesData',quesSchema);
export default QuesData
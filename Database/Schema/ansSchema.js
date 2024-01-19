import mongoose from "mongoose";
const ansSchema = mongoose.Schema({
    // option should be array
    ans: {
        type: [String], 
        required: true,
    },

})
const AnsData = new mongoose.model('AnsData',ansSchema);
export default AnsData
import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const loginSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    }
})

//hashing password
loginSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()

})

const LoginCredential = new mongoose.model('LoginCredential',loginSchema)
export default LoginCredential
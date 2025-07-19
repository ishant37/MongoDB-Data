import { Schema,model } from "mongoose";

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        maxlength:50
    },
    age:{
        type:Number,
        required:true,
        min:1,
        max:120
    },
    weight:{
        type:Number,
        required:true,
        min:1,
        max:300
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})
const User = model('User', userSchema);
export default User;


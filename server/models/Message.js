import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
   
    sender:{type:String,required:true,enum:['bot','user']},
    message:{type:String,required:true},
},{timestamps: true});

export default mongoose.model('Message',messageSchema);
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum:['male','female',"prefer not to say"],
        required: true,
    },
   language: {
        type: String,
        enum:['english','hindi','tamil','telugu','kannada','français'],
        required: true,     
    }},{timestamps: true});
    export default mongoose.model("User", userSchema);
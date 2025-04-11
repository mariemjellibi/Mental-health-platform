import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
const JWT_SECRET =process.env.JWT_SECRET;
export const register = async(req,res)=>{
    const { name, email, password, age, gender, language } = req.body;

    try{
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({ name, email, password:hashedPassword, age, gender, language });
        const token = generateToken(res,user._id);
        res.status(201).json({user,token});

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const login = async(req,res)=>{
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }   
        const token = generateToken(res,user._id);
        res.status(200).json({user,token}); 
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }   
    }
export const getCurrentUser = async (req, res) => { 
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

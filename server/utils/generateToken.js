import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (res,userId) => {
    const token =jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    }); // console.log(token);
    console.log("secret key in generateToken.js:", process.env.JWT_SECRET); // Log the generated token
    res.cookie("token", token, {
        httpOnly: true, // ensures cookie is not accessible via JavaScript
        maxAge: 30 * 24 * 60 * 60 * 1000, // expires in 30 days
      });
      
    
    return token;
    };
export default generateToken;
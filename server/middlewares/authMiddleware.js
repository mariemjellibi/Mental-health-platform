import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

// const protectRoutes = async (req, res, next) => {
//   let token;

//   // Check for token in cookies or Authorization header
//   if (req.cookies && req.cookies.token) {
//     token = req.cookies.token;
//   } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');

//     if (!req.user) {
//       return res.status(401).json({ message: 'Unauthorized: User not found' });
//     }

//     next();
//   } catch (err) {
//     console.error('JWT verification error:', err);
//     return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//   }
// };

// const protectRoutes = async (req, res, next) => {
//   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

//   console.log('Token received:', token); // Add this log

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   console.log('JWT Secret:', process.env.JWT_SECRET);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (err) {
//     console.error('Error verifying token:', err); // Log token verification errors
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };
// const protectRoutes = async (req, res, next) => {
//   let token;

//   // 1. Check if token is in Authorization header
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     try {
//       // 2. Extract token
//       token = req.headers.authorization.split(' ')[1];
//       console.log("Token received on backend:", token);

//       // 3. Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded.id;

//       next();
//     } catch (error) {
//       console.error('Error verifying token:', error.message);
//       return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };
const protectRoutes = async (req, res, next) => {
  let token =  req.headers.authorization?.split(' ')[1];

  console.log('Token received:', token); // Make sure this is the token you're expecting

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};





export default protectRoutes;

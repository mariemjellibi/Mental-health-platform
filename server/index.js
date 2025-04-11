import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/messageRoutes.js';
import authRoutes from './routes/authRoutes.js';
import journalRoutes from './routes/journalRoutes.js';
import {connectDB} from './db/connect.js';
dotenv.config();

const app = express();

app.use(cors({  credentials: true ,// Enable sending cookies with requests,
origin: 'http://localhost:5173' })); // Replace with your frontend URL

app.use(bodyParser.json());
app.use(cookieParser());
connectDB();
const PORT =process.env.PORT || 5002;
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
  app.use('/api/journal', journalRoutes);
app.listen(PORT, () => {
  console.log('Server is running on port 5002');
}   );  
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';

dotenv.config(); 



const app=express()
const PORT=process.env.PORT||4000
await connectDB();


try {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error('Error starting the server:', error);
}

app.use('/api/user',userRouter);




//middleware

app.use(express.json());
app.use(cors());
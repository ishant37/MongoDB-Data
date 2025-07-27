import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';


import authRoutes from './routes/auth.routes.js'; // Adjust the path as necessary
import connectDB from './lib/db.js'; // Adjust the path as necessary
import messageRoutes from './routes/message.routes.js'; // Adjust the path as necessary
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'], // Replace with your frontend URL
  credentials: true,
}));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRoutes); // Import and use auth routes
app.use('/api/messages', messageRoutes); // Import and use message routes
// Start the server
const startServer = async () => {
  
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
  });
}

startServer().catch(err => {
  console.error('Error starting the server:', err);
  process.exit(1);
});
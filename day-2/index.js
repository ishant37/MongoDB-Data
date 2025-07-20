import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import session from 'express-session';
import router from './routes/user.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));
connectDB();

//Routes
app.use('/api',router);


app.get('/', (req, res) => {
  res.send('Hello, World!');    
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
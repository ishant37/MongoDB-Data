import express from 'express';
import connectDB from './config/db.js';
import router from './routes/user.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); 
connectDB();
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
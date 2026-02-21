import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import connectDB from './configs/database.config.js';
import userRoute from './routes/user.route.js';
import dashboardRoute from './routes/dashboard.route.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('news portal SERVER is running...');
});
app.get('/api/v1/npw', (req, res) => {
  res.send('News Portal Website Server is now live');
});

app.use('/api/v1/npw/auth', userRoute);
app.use('/api/v1/npw/dashboard', dashboardRoute);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

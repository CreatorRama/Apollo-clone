import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import  doctorRoutes from './routes/doctor.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:['https://apollo-clone-alpha.vercel.app/','http://localhost:3000']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/apollo-clone')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

app.use('/api/doctors', doctorRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Apollo Clone API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

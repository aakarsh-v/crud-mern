import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userModel from './model/Users';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/routes", createUser);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


mongoose.connect("mongodb://localhost:27017/crud-mern")
.then(() => {
    console.log("MongoDB connected");
    app.listen(3001, () => {
  console.log('Server is running on port 5000');
});
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
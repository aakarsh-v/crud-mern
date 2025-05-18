import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userModel from './model/Users.js';

const app = express();
app.use(cors());
app.use(express.json());

// app.use("/routes", createUser);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/getUsers', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
})

app.get('/getUser/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
})

app.post('/createUser', async (req, res) => {
    try {
        userModel.create(req.body)
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.json(err)
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
})

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);
        if(!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", deletedUser })
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
})

app.put('/updateUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body);
        if(!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
})

mongoose.connect("mongodb://localhost:27017/crud-mern")
.then(() => {
    console.log("MongoDB connected");
    app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
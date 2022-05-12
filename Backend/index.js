// external import
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
// internal import
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';

const app = express();
dotenv.config();

// database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('mongoDB connected');
    } catch (err) {
        throw err;
    }
};
mongoose.connection.on("disconnected", () => {
    console.log("mongoose Disconnected");
});
mongoose.connection.on("connected", () => {
    console.log("mongoose connected");
});

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
// error handler
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(process.env.PORT, () => {
    connect();
    console.log(`Server Running on Port ${process.env.PORT}`);
});
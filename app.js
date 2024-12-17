import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import contactRouter from "./router/contactRouter.js";
import userRouter from "./router/userRouter.js";

const allowedExtensions = [ 'http://localhost:5173',
    'https://sr-cp-frontend.onrender.com' ];

const app = express();

dotenv.config({ path: "./config/config.env" });

// app.use(cors({
//     origin: process.env.FRONTEND_URL, 
//     methods: ["POST" , "DELETE" ], 
//     credentials: true, 
// }));

//Updated to fix cors policy error

app.use(cors({
    origin: (origin, callback) => {
        if (allowedExtensions.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "POST, DELETE ",
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use("/contactus", contactRouter);
app.use("/user", userRouter);

export default app;

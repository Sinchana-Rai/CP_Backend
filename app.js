import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import cors from "cors";
import contactRouter from "./router/contactRouter.js";
import userRouter from "./router/userRouter.js";

// const FRONTEND_URL= `https://sr-cp-frontend.onrender.com`;

const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: ["POST" , "DELETE" ], 
    credentials: true, 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnection();

app.use("/contactus", contactRouter);
app.use("/user", userRouter);

export default app;

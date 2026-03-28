import express from "express";
import mongoose from "mongoose";
import dns from "node:dns";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

dotenv.config();

const mongoURL = process.env.MOONGO_URI;

mongoose.connect(mongoURL).then(
    ()=>{
    console.log("Connected to MongoDB");
})

app.use(cors());

app.use(express.json());  

app.use(authenticateUser);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(3000,()=>{console.log("Server in running on port 3000");} )

//testing
import express from "express";
import mongoose from "mongoose";
import dns from "node:dns";
import userRouter from "./routers/userRouter.js";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

const mongoURL = "mongodb+srv://admin:1234@cluster0.i1sxlyv.mongodb.net/icomputers?appName=Cluster0"

mongoose.connect(mongoURL).then(
    ()=>{
    console.log("Connected to MongoDB");
})

app.use(express.json());  

app.use(authenticateUser);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(3000,()=>{console.log("Server in running on port 3000");} )
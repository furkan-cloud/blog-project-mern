// const express = require("express")
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express(); //express serverı oluşturma
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}))  // uyarı mesajları görünmesin diye extended ekledik
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.get("/", (req,res) => {
    // res.send("Blog project");
    res.json({
        author: "furkan",
        message: "Hello World"
    })
});

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,     //
    useUnifiedTopology: true, // bunlar da uyarı almamak için
})
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`);
    })
})
.catch(() => {
    console.error(error.message);
});
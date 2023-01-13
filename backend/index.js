import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import db from "./config/Database.js";
import router from "./routes/index.js";
import fileUpload from 'express-fileupload'
import bodyparser from 'body-parser';
dotenv.config();
const app = express();

app.use(fileUpload())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(express.json())
app.use(cors())
// app.use(express.static('uploads'))
app.use('/uploads', express.static('uploads'));

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('Server running at port 5000'));
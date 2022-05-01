import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const app = express();
import postsRoute from './routes/posts.js'
app.use(cors);
dotenv.config();
app.use(bodyParser.json({ limit: "mb", extends: true }));
app.use(bodyParser.urlencoded({ limit: "mb", extends: true }));
app.use('/api/v1/posts', postsRoute);
const { HOST, CONNECTION_URL, PORT } = process.env;
mongoose
    .connect(CONNECTION_URL)
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.error('connection failed =>', err);
    });

app.listen(PORT, HOST, () => {
    console.log('server is running');
});
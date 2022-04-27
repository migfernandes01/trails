import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { trailsRouter } from './routes/trails.js';
import 'dotenv/config';
// new instance of express
const app = express();
// use body parser and cors
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// use trailsRouter for /trails routing
app.use('/trails', trailsRouter);
// Mongodb connection url and PORT
const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.a0pw6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;
// mongoose connection
mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}))
    .catch((error) => console.log(error.message));

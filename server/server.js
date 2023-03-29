import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './router/router.js';
import tweetRouter from './router/tweetRouter.js';

const app = express();
const apiPort = 3000

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

app.get('/', (req, res)=>{
    res.status(201).json("Home GET request");
});

module.exports = router;
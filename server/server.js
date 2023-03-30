import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './router/router.js';
import tweetRouter from './router/tweetRouter.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');


app.get('/', (req, res)=>{
    res.status(201).json("Home GET request");
});

app.use('/api', router);
app.use('/api/tweet', tweetRouter);

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log('Server connected to localhost');
        })
    } catch (error){
        console.log('Cannot connect to the server');
    }
}).catch(error => {
    console.log("Invalid database connection!!!");
})

var books = [{
    "BookID": "1",
    "Title": "Book 1",
    "Author": "Author 1"
},
{
    "BookID": "2",
    "Title": "Book 2",
    "Author": "Author 2"
},
{
    "BookID": "3",
    "Title": "Book 3",
    "Author": "Author 3"
}
]
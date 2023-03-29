import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './router/router.js';

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

app.get('/', (req, res)=>{
    res.status(201).json("Home GET request");
});

app.use('/api', router)

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


import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './router/router.js';
import tweetRouter from './router/tweetRouter.js';
import { createProxyMiddleware } from "http-proxy-middleware";
import next from 'next';

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler()


const apiPaths = {
    '/api': {
        target: 'http://localhost:8080',
        pathRewrite: {
            '^/api': '/api'
        },
        changeOrigin: true
    }
}


const isDevelopment = process.env.NODE_ENV !== 'production'


app.prepare().then(() => {
    console.log("App is ready")
    const server = express();
    if(isDevelopment){
    server.use('/middleware', createProxyMiddleware(apiPaths['/api']));

    server.get('/', (req, res)=>{
        res.status(201).json("Home GET request");
    });

    server.use('/api', router);
    server.use('/api/tweet', tweetRouter);
    server.use('/login', router);
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}
    // connect().then(() => {
    //     try {
    //         app.listen(port, () => {
    //             console.log('Server connected to localhost');
    //         })
    //     } catch (error){
    //         console.log('Cannot connect to the server', error);
    //     }
    // }).catch(error => {
    //     console.log("Invalid database connection!!!", error);
    // })

    
})
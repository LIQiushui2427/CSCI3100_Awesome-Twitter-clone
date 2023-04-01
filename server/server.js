import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/connection.js';
import router from './router/router.js';
import tweetRouter from './router/tweetRouter.js';
const app = express();
import multer from 'multer';

// Set up Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create Multer instance
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

// route to handle file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded successfully');
  });
  
  // serve static files from the uploads folder
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res)=>{
    res.status(201).json("Home GET request");
});

app.use('/api', router)

app.use('/api/tweet', tweetRouter)

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


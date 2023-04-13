import mongoose from "mongoose";
import ENV from '../config.js';
import {MongoMemoryServer} from "mongodb-memory-server";

async function connect(){
    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(ENV.ATLAS_URI);
    
    console.log("Database Connected to: " + ENV.ATLAS_URI);
    return db;
}

export default connect;

// Importing required modules
import mongoose from "mongoose";
import ENV from '../config.js';
import {MongoMemoryServer} from "mongodb-memory-server";

// Async function to connect to MongoDB Atlas
async function connect(){
    // Enforcing strict mode for queries
    mongoose.set('strictQuery', true);
    // Connecting to MongoDB Atlas
    const db = await mongoose.connect(ENV.ATLAS_URI);
    // Logging connection status
    console.log("Database Connected to: " + ENV.ATLAS_URI);
    // Returning the database instance
    return db;
}

// Exporting the function as a default module
export default connect;

import mongoose from "mongoose";
import ENV from '../config.js';
import {MongoMemoryServer} from "mongodb-memory-server";

async function connect(){
    // const mongod = await MongoMemoryServer.create();
    // const getUri = mongod.getUri();

    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log("Database Connect at: ", db.connection.host);
    return db;
}

export default connect;
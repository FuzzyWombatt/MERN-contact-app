import mongoose from "mongoose";

import { createRequire } from "module";
//ugle way to use modules to read JSON
const require = createRequire(import.meta.url);
const data = require("./default.json");


const db = data.mongoURI;

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });

        console.log('Mongo connected');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

export {connectDB}


//other method to load in config json in node modules
/*
import { readFile } from 'fs/promises';
const config = JSON.parse(
  await readFile(
    new URL('./default.json', import.meta.url)
  )
);
*/
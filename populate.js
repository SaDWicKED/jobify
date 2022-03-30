import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import { mongoConnect } from './db/connect.js';
import Job from './models/Job.js';

const start = async () => {
  try {
    await mongoConnect(process.env.MONGO_URL)
    await Job.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    );
    await Job.create(jsonProducts);
    console.log('Success!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();

import * as dotenv from 'dotenv';
import dbConnector from './db/dbConnector.js';
import myJson from './products.json' assert {type: 'json'};
import ProductsSchema from './models/products.js';


dotenv.config();
const start = async () => {
  try {
    await dbConnector(process.env.MONGO_DB_URL);
    await ProductsSchema.deleteMany();
    await ProductsSchema.create(myJson);
    console.log('Success!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

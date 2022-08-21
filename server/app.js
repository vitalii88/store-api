import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dbConnector from './db/dbConnector.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
// middleware
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, resp) => {
  resp.send('<h1>Store API</h1> <a href="/api/v1/products">Products route</a>')
});

// Product routes


app.use(notFound);
app.use(errorHandler);

dbConnector(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server run on porn: ${PORT}`);
    });
  }).catch((error) => console.log(error));


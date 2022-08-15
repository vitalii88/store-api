import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import dbConnector from './db/dbConnector.js';
import notFound from './middleware/notFound.js';

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();
// middleware
app.use(cors());
app.use(express.json());

// routes

app.use(notFound);
dbConnector(process.env.MONGO_DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server run on porn: ${PORT}`);
    });
  }).catch((error) => console.log(error));


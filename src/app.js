import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import appRouter from './app-router';
import config from './config';

const app = express();


const DATABASE_URI = config.DATABASE_URI; 

// connect to database
mongoose
  .connect(DATABASE_URI, { useNewUrlParser: true, useCreateIndex: true }) 
  .then(() => console.info('APP: Connected to database'));

app.use(cors());
app.use(bodyParser.json());

app.use(appRouter);

// handle all unfound routes
app.use('*', (req, res) => (
  res.status(404).json({
    message: 'Not found'
  })
));

export default app;


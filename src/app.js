import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import yaml from 'yamljs';
import swaggerUi from 'swagger-ui-express';

import appRouter from './app-router';

import config from './config';

const app = express();
const swaggerDocument = yaml.load('docs/swagger.yml');

const DATABASE_URI = config.DATABASE_URI; 

// connect to database
mongoose
  .connect(DATABASE_URI, { useNewUrlParser: true, useCreateIndex: true }) 
  .then(() => console.info('APP: Connected to database'));

app.use(cors());
app.use(bodyParser.json());

app.use('/v1', appRouter);

// api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// handle all unfound routes
app.use('*', (req, res) => (
  res.status(404).json({
    message: 'Not found'
  })
));

export default app;


import express from 'express'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

const express = require('express');
const cors = require('cors');
const connectWithDB = require('./config/db');
dotenv.config();
// const cloudinary = require('cloudinary').v2;

// connect with database
connectWithDB();

// cloudinary configuration
/* cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); */

const app = express();

/* CONFIGURATION */
// middleware to handle json
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy: 'cross-origin' } ));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

/* ROUTES */
// use express router
app.use('/', require('./routes'));
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);


app.listen(process.env.PORT || 8001, (err) => {
  if (err) {
    console.log('Error in connecting to server: ', err);
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = app;

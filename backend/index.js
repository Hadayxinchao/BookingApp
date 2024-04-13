import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';
import express from 'express';
import cors from 'cors';
import connectWithDB from './config/db.js';
import User from './models/User.js';
import  { dataUser } from './data/index.js'

/* CONFIGURATION */
// middleware to handle json
dotenv.config();
const app = express();
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

// const cloudinary = require('cloudinary').v2;

// connect with database
connectWithDB();

// cloudinary configuration
/* cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}); */

/* ROUTES */
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);


// app.listen(process.env.PORT || 8001, (err) => {
//   if (err) {
//     console.log('Error in connecting to server: ', err);
//   }
//   console.log(`Server is running on port ${process.env.PORT}`);
// });

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8001;
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));

export default app;

//securty packages
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
// package imports
import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session'
import cookieParser from 'cookie-parser';
import SessionStore from 'connect-mongo';
import passport from 'passport'
// files imports
import errorHandler from './middleware/errorhandler.js';
import mongoClient from './config/db.js';
// API DOcumenATion
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
// routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// dotenv config
dotenv.config();

// connect to Database
await mongoClient();

// Swagger api config
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Get Hired Hub',
      description: "A hub to land opportunities",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ['./swaggerDoc/*','./routes/*.js'],
};

const spec = swaggerDoc(options);

const app = express();

//middelwares
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
  methods: 'GET,PUT,POST,DELETE'
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: SessionStore.create({
      mongoUrl: process.env.SESSION_STORAGE,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/user', userRoutes);

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

app.use(errorHandler);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`server running in ${process.env.MODE} mode on port ${PORT}`);
});

export default app;


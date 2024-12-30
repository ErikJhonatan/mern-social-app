import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AuthMiddleware from './middlewares/AuthMiddleware.js'
import ErrorMiddleware from './middlewares/ErrorMiddleware.js';
import authRouter from './routes/auth.js';
import UsersRouter from './routes/users.js';
import checkUserExists from './middlewares/checkUserExists.js';

const app = express();
const port = 3000;
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));


// Middleware
app.use(express.json());
app.use(helmet()); // sirve para proteger la app de ciertos ataques en la web ejemplos: xss, clickjacking, etc
app.use(morgan('common')); // sirve para ver las peticiones que se hacen a la app
app.use(cors(
{
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}
));
app.use(cookieParser());
app.use(AuthMiddleware);
app.use(checkUserExists);


app.get('/', (req, res) => {
  const dataResponse = {
    message: 'Service running'
  };
  res.json(dataResponse).status(200);
});

app.use('/api/auth', authRouter);
app.use('/api/users', UsersRouter);
app.use(ErrorMiddleware);


app.listen(port, () => {
  console.log(`Server running, http://localhost:${port}`);
});
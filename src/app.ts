import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import logger from './utils/logger';
// import { DATABASE_URL } from './utils/secrets';
// import logger from './utils/logger';

// import * as homeRoute from './requestHandlers/home';
// import * as userRoute from './requestHandlers/user';

import userRoutes from './routes/user.routes';
// Create Express server
const app: express.Express = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

mongoose
  .connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger.info('Database connected');
  })
  .catch((err) => {
    logger.error('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
  });

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);

// app.get('/', homeRoute.index);
// app.post('/login', userRoute.login);
// app.post('/signup', userRoute.signup);

app.use((_req, res): void => {
  res.status(404).send({
    success: false,
    error: 'resource not found',
  });
});

export default app;

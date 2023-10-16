import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import cookieParser from 'cookie-parser';
import { NotFoundHandler } from './errors/NotFoundHandler';
import fileUpload from 'express-fileupload';

const app: Application = express();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(cookieParser());

//parser
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1', routes);

// root route
app.get('/', (req: Request, res: Response) => {
  res.send('Car server is running..');
});

//global error handler
app.use(globalErrorHandler);

//handle not found
app.use(NotFoundHandler.handle);

export default app;

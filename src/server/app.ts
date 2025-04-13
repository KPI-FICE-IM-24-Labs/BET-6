import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { logger } from '../logger';
import { appRouter } from './api';
import path from 'node:path';
import 'dotenv/config';
import { usersRouter } from './api/users/users.router';
import mongoose from 'mongoose';
import { startApolloServer } from '../apollo';

export class App {
  private readonly app: Express;
  public static instance: Express | undefined;

  constructor() {
    if (App.instance) {
      throw Error('App already initialized');
    }

    this.app = express();
    App.instance = this.app;
    this.setupMiddleware();
    this.setupRoutes();
    this.startApolloServer();
    this.connectToDb();
    logger.info('App initialized successfully');
  }

  public listen(port: number, host: string) {
    this.app.listen(port, host, () => {
      logger.info(`Server listening on http://${host}:${port}`);
    });
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.set('view engine', 'hbs');
    this.app.use(express.static(path.resolve('public')));

    logger.info('Middleware set up successfully');
  }

  private setupRoutes() {
    this.app.use(appRouter);
    this.app.use(usersRouter);
    logger.info('Routes set up successfully');
  }

  private startApolloServer() {
    startApolloServer(this.app).then(() => {
      logger.info('Apollo server started successfully');
    });
  }

  private connectToDb() {
    mongoose.connect(process.env.MONGODB_URI as string).then(() => {
      logger.info('Connection to database established successfully');
    });
  }
}

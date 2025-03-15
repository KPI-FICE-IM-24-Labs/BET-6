import express from 'express';
import { UsersService } from './users.service';
import { logger } from '../../../logger';

export const usersRouter = express.Router();
const userService = new UsersService();

usersRouter.get('/users', userService.getAllUsers);
usersRouter.get('/users/json', userService.getAllUsersJSON);
usersRouter.post('/users', userService.createUser);
usersRouter.post('/users/update/:id', userService.updateUser);
usersRouter.post('/users/delete/:id', userService.deleteUser);
logger.info('Users router initialized');

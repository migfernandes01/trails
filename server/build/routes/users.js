// router for users at /users
import express from 'express';
import { signin, signup } from '../controllers/users.js';
// new express Router
export const usersRouter = express.Router();
// POST to '/signin'
usersRouter.post('/signin', signin);
// POST to '/signup'
usersRouter.post('/signup', signup);

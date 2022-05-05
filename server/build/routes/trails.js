// router for trails at /trails
import express from 'express';
import { getTrails, getTrail, getTrailsBySearch, createTrail, updateTrail, deleteTrail, likeTrail, commentTrail } from '../controllers/trails.js';
import { auth } from '../middleware/auth.js';
// new express Router
export const trailsRouter = express.Router();
// GET to /trails/search
trailsRouter.get('/search', getTrailsBySearch);
// GET to /trails
trailsRouter.get('/', getTrails);
// GET to /trails/:id
trailsRouter.get('/:id', getTrail);
// POST to /trails (auth middleware, controller)
trailsRouter.post('/', auth, createTrail);
// PATCH to /trails/:id (auth middleware, controller)
trailsRouter.patch('/:id', auth, updateTrail);
// DELETE to /trails/:id (auth middleware, controller)
trailsRouter.delete('/:id', auth, deleteTrail);
// PATCH to /trails/:id/likeTrail (auth middleware, controller)
trailsRouter.patch('/:id/likeTrail', auth, likeTrail);
// POST to /trails/:id/comment (auth middleware, controller)
trailsRouter.post('/:id/comment', auth, commentTrail);

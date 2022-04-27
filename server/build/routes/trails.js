// router for trails at /trails
import express from 'express';
import { getTrails, createTrail, updateTrail } from '../controllers/trails.js';
// new express Router
export const trailsRouter = express.Router();
// GET to /trails
trailsRouter.get('/', getTrails);
// POST to /trails
trailsRouter.post('/', createTrail);
// PATCH to /trails/:id
trailsRouter.patch('/:id', updateTrail);

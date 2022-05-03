// controllers for trails
import {Request, Response} from 'express';  // express types
import mongoose from 'mongoose';
import { Trail } from '../models/trail.js'; // Trail model

// get Trails controller
export const getTrails = async (req: Request, res: Response): Promise<any> => {
    try {
        // find all trails in Trail model
        const trails = await Trail.find();
        // console.log(trails);
        // send trails in json type with a status of 200
        res.status(200).json(trails);
    } catch(err: any) {
        // send error if there's any
        res.status(404).json({message: err.message})
    }
}

//  create trail controller
export const createTrail = async (req: Request, res: Response): Promise<any> => {
    // get trail from request body
    const trail = req.body;
    console.log(res.locals.userId);
    // create new Trail passing trail, author and new date
    const newTrail = new Trail({ ...trail, createdAt: new Date().toISOString() });
    try {
        // try to save it
        await newTrail.save();
        // send the new trail as json with status of 201
        res.status(201).json(newTrail);
    } catch (err: any) {
        // send error if there's any
        res.status(409).json({message: err.message})
    }
}

// update trail controller
export const updateTrail = async (req: Request, res: Response): Promise<any> => {
    // extract id from request
    const { id: _id } = req.params;

    // console.log('UPDATING, ID, TRAIL', _id, req.body);

    // if id is not valid
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No exisitng trail with that id');
    }

    // update with the id
    const updatedTrail = await Trail.findByIdAndUpdate(_id, {...req.body, _id}, { new: true });
    
    // send the new updated trail
    res.json(updatedTrail);
}

// delete trail controller
export const deleteTrail = async (req: Request, res: Response): Promise<any> => {
    // extract id from request
    const { id: _id } = req.params;

    // if id is not valid
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No exisitng trail with that id');
    }

    // delete trail by id
    await Trail.findByIdAndRemove(_id);

    // send success message
    res.json({ message: 'Trail deleted successfully' });
};

export const likeTrail = async (req: Request, res: Response): Promise<any> => {
    // extract id from request
    const { id: _id } = req.params;

    // check if user is authenticated
    if(!res.locals.userId){
        return res.json({ message: 'Unauthenticated' });
    }

    // if id is not valid
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No exisitng trail with that id');
    }

    // find trail to update
    const trail = await Trail.findById(_id);

    // type guard
    if(trail) {
        // get index of userId in trail.likes array
        const index = trail?.likes.findIndex((id) => id === String(res.locals.userId));

        // if id is not in trail.likes array
        if(index === -1){
            // like post
            trail.likes.push(res.locals.userId);
        } else {    // if userId is in trail.likes array
            // dislike post
            trail.likes = trail.likes.filter((id) => id !== String(res.locals.userId));
        }

        // update like count
        const updatedTrail = await Trail.findByIdAndUpdate(_id, trail, { new: true });
        res.json({updatedTrail});
    }
}
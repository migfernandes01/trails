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
    // create new Trail passing trail
    const newTrail = new Trail(trail);
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

    // if id is not valid
    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No exisitng trail with that id');
    }

    // find trail to update
    const trail = await Trail.findById(_id);

    // type guard
    if(trail) {
        // update like count
        const updatedTrail = await Trail.findByIdAndUpdate(_id, { likeCount: trail.likeCount + 1 }, { new: true })
        res.json({updatedTrail});
    }
}
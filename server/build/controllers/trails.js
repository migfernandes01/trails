var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import { Trail } from '../models/trail.js'; // Trail model
// get Trails controller
export const getTrails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // find all trails in Trail model
        const trails = yield Trail.find();
        // console.log(trails);
        // send trails in json type with a status of 200
        res.status(200).json(trails);
    }
    catch (err) {
        // send error if there's any
        res.status(404).json({ message: err.message });
    }
});
//  create trail controller
export const createTrail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get trail from request body
    const trail = req.body;
    // create new Trail passing trail
    const newTrail = new Trail(trail);
    try {
        // try to save it
        yield newTrail.save();
        // send the new trail as json with status of 201
        res.status(201).json(newTrail);
    }
    catch (err) {
        // send error if there's any
        res.status(409).json({ message: err.message });
    }
});
// update trail controller
export const updateTrail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract id from request
    const { id: _id } = req.params;
    // console.log('UPDATING, ID, TRAIL', _id, req.body);
    // if id is not valid
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No exisitng trail with that id');
    }
    // update with the id
    const updatedTrail = yield Trail.findByIdAndUpdate(_id, Object.assign(Object.assign({}, req.body), { _id }), { new: true });
    // send the new updated trail
    res.json(updatedTrail);
});
// delete trail controller
export const deleteTrail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract id from request
    const { id: _id } = req.params;
    // if id is not valid
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No exisitng trail with that id');
    }
    // delete trail by id
    yield Trail.findByIdAndRemove(_id);
    // send success message
    res.json({ message: 'Trail deleted successfully' });
});
export const likeTrail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract id from request
    const { id: _id } = req.params;
    // if id is not valid
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No exisitng trail with that id');
    }
    // find trail to update
    const trail = yield Trail.findById(_id);
    // type guard
    if (trail) {
        // update like count
        const updatedTrail = yield Trail.findByIdAndUpdate(_id, { likeCount: trail.likeCount + 1 }, { new: true });
        res.json({ updatedTrail });
    }
});

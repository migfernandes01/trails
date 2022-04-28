import { AnyAction } from 'redux';
import { Actions } from '../../constants/actionTypes';

// new Trail interface
interface Trail {
    _id: number;
    title: string;
    description: string;
    creator: string;
    tags: string[];
    likeCount: number;
    createdAt: Date;
}

export default (trails: Trail[] = [], action: AnyAction) => {
    switch(action.type) {
        case Actions.fetchAll:
            return action.payload;
        case Actions.create:
            return [...trails, action.payload];
        case Actions.update:
        case Actions.like:
            // return new array of trails
            return trails.map((trail) => trail._id === action.payload._id ? action.payload : trail);
        case Actions.delete:
            // keep all posts EXCEPT the one where id === action.payload(deleted post id)
            return trails.filter((trail) => trail._id !== action.payload);
        default:
            return trails;
    }
};
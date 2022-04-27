import { AnyAction } from 'redux';

// new Trail interface
interface Trail {
    _id: number;
    title: string;
    description: string;
    creator: string;
    tags: string[];
    likeCount: {
        type: number,
        default: number,
    };
    createdAt: {
        type: Date,
        default: Date,
    }
}

export default (trails: Trail[] = [], action: AnyAction) => {
    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...trails, action.payload];
        case 'UPDATE':
            // return trail to be updated
            return trails.map((trail) => trail._id === action.payload._id ? action.payload : trail);
        default:
            return trails;
    }
};
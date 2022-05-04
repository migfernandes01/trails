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

interface IState {
    trails: Trail[];
    currentPage: number;
    numberOfPages: number;
}

export default (state: {isLoading: boolean; trails: Trail[]} = { isLoading: true, trails: [] }, action: AnyAction) => {
    switch(action.type) {
        case Actions.startLoading:
            return {
                ...state,
                isLoading: true
            }
        case Actions.endLoading:
            return {
                ...state,
                isLoading: false
            }
        case Actions.fetchAll:
            return {
                ...state,
                trails: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case Actions.fetchBySearch:
            return {
                ...state,
                trails: action.payload.data,
            };
        case Actions.create:
            return {
                ...state,
                trails: [...state.trails, action.payload]
            }
        case Actions.update:
        case Actions.like:
            // return new array of trails
            return {
                ...state,
                trails: state.trails.map((trail) => trail._id === action.payload._id ? action.payload : trail)
            }
        case Actions.delete:
            // keep all posts EXCEPT the one where id === action.payload(deleted post id)
            return {
                ...state,
                trails: state.trails.filter((trail) => trail._id !== action.payload)
            }
        default:
            return state;
    }
};
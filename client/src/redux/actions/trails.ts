import { Dispatch } from 'redux';
import * as api from '../../api';
import { Actions } from '../../constants/actionTypes';

interface Trail {
    title: string;
    description: string;
    author: string;
    tags: string[];
    selectedFile: string;
}

// Action Creators

// using redux thunk
export const getTrails = () => async(dispatch: Dispatch) => {
    try {
        // make a call to api to fetch all trails and get data back
        const { data } = await api.fetchTrails();
        // dispatch new FETCH_ALL action 
        dispatch({type: Actions.fetchAll, payload: data})
    } catch (error: any) {
        console.log(error.message);
    }
};

// action creator to dispatch a new CREATE action
export const createTrail = (trail: Trail ) => async(dispatch: Dispatch) => {
    try {
        // make a call to api to create trail and get data back
        const { data } = await api.createTrail(trail);
        // dispatch new CREATE action 
        dispatch({ type: Actions.create, payload: data });
    } catch (error: any) {
        console.log(error.message);
    }
};

// action creator to dispatch a new UPDATE action
export const updateTrail = (id: any, trail: api.Trail) => async(dispatch: Dispatch) => {
    try {
        // make a call to api to update trail and get data back
        const { data } = await api.updateTrail(id, trail);
        // dispatch new UPDATE action 
        dispatch({ type: Actions.update , payload: data});
    } catch (error: any) {
        console.log(error.message);
    }
};

// action creator to distpatch a new DELETE action
export const deleteTrail = (id: any) => async(dispatch: Dispatch) => {
    try {
        // await call to api to delete trail passing an id
        await api.deleteTrail(id);
        // dispatch new DELETE action 
        dispatch({ type: Actions.delete , payload: id});
    } catch (error: any) {
        console.log(error.message);
    }
};

// action creator to distpatch a new LIKE action
export const likeTrail = (id: any) => async(dispatch: Dispatch) => {
    try {
        // await call to api to delete trail passing an id
        const { data } = await api.likeTrail(id);
        // dispatch new DELETE action 
        dispatch({ type: Actions.like , payload: data});
    } catch (error: any) {
        console.log(error.message);
    }
};
import { Dispatch } from 'redux';
import * as api from '../../api';


// Action Creators

// using redux thunk
export const getTrails = () => async(dispatch: Dispatch) => {
    try {
        // make a call to api to fetch all trails and get data back
        const { data } = await api.fetchTrails();
        // dispatch new FETCH_ALL action 
        dispatch({type: 'FETCH_ALL', payload: data})
    } catch (error: any) {
        console.log(error.message);
    }
};

// action creator to dispatch a new CREATE action
export const createTrail = (trail: api.Trail ) => async(dispatch: Dispatch) => {
    try {
        // make a call to api to create trail and get data back
        const { data } = await api.createTrail(trail);
        // dispatch new CREATE action 
        dispatch({ type: 'CREATE', payload: data });
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
        dispatch({ type: 'UPDATE' , payload: data});
    } catch (error: any) {
        console.log(error.message);
    }
};
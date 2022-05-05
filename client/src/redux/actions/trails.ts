import { Dispatch } from 'redux';
import * as api from '../../api';
import { Actions } from '../../constants/actionTypes';

interface Trail {
    title: string;
    description: string;
    author: string;
    authorId: string;
    tags: string[];
    selectedFile: string;
    likes?: string[];
};

export interface ISearch {
    search: string;
    tags: string;
}

// Action Creators

// using redux thunk for async actions
export const getTrails = (page: string | number) => async(dispatch: Dispatch) => {
    try {
        // dispatch startLoading action
        dispatch({ type: Actions.startLoading });
        // make a call to api to fetch all trails and get data back
        const { data } = await api.fetchTrails(page);
        // dispatch new FETCH_ALL action 
        dispatch({type: Actions.fetchAll, payload: data});
        //dispatch endLoading action
        dispatch({ type: Actions.endLoading });
    } catch (error: any) {
        console.log(error.message);
    }
};

// action creator to dispatch a new fetch post action
export const getTrail = (id: string) => async(dispatch: Dispatch) => {
    try {
        // dispatch startLoading action
        dispatch({ type: Actions.startLoading });
        // make a call to api to fetch all trails and get data back
        const { data } = await api.fetchTrail(id);
        // dispatch new FETCH_ALL action 
        dispatch({type: Actions.fetchTrail, payload: data});
        //dispatch endLoading action
        dispatch({ type: Actions.endLoading });
    } catch (error: any) {
        console.log(error.message);
    }
}

// action creator to dispatch a new CREATE action
export const getTrailsBySearch = (searchQuery: ISearch) => async(dispatch: Dispatch) => {
    try {
        // dispatch startLoading action
        dispatch({ type: Actions.startLoading });
        // call api endpoint to fetch trails by search with the serachQuery
        const { data } = await api.fetchTrailsBySearch(searchQuery);
        // dispatch new FETCH_BY_SEARCH action with payload we got back from backend 
        dispatch({type: Actions.fetchBySearch, payload: data});
         //dispatch endLoading action
         dispatch({ type: Actions.endLoading });
    } catch (error: any) {
        console.log(error.message);
    }
};

// action creator to dispatch a new CREATE action
export const createTrail = (trail: Trail, history: any ) => async(dispatch: Dispatch) => {
    try {
        // dispatch startLoading action
        dispatch({ type: Actions.startLoading });
        // make a call to api to create trail and get data back
        const { data } = await api.createTrail(trail);
        // push user to /trails/id of created trail
        history.push(`/trails/${data._id}`);
        // dispatch new CREATE action 
        dispatch({ type: Actions.create, payload: data });
        //dispatch endLoading action
        dispatch({ type: Actions.endLoading });
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

// action creator to distpatch a new COMMENT action
export const commentTrail = (value: string, id: number) => async(dispatch: Dispatch) => {
    try {
        // call api to comment
        const { data } = await api.commentTrail(value, id);
        // dispatch new comment action with the new value of trail as the payload
        dispatch({ type: Actions.comment, payload: data });
        return data.comments;
    } catch (error: any) {
        console.log(error.message);
    }
}
import { AnyAction } from "redux";
import { Actions } from "../../constants/actionTypes";

interface Auth {
    authData: any
}

const authReducer = (state: Auth = { authData: null }, action: AnyAction) => {
    switch(action.type){
        case Actions.auth:
            // store data in localStorage
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));
            // return state, with authData = data we got from auth
            return {...state, authData: action.data};
        case Actions.logout:
            // clear localstorage
            localStorage.clear();
            // return state, with authData = null
            return {...state, authData: null};
        default:
            return state;
    }
};

export default authReducer;
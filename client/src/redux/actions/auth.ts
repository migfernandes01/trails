import { Dispatch } from 'redux';
import * as api from '../../api';
import { Actions } from '../../constants/actionTypes';
import { FormData } from '../../components/Auth/Auth';
import { History } from 'history';

// Action Creators

export const signup = (formData: FormData, history: History<unknown>) => async (dispatch: Dispatch) => {
    try {
        // log in user

        // redirect user to /
        history.push('/');
    } catch (error: unknown) {
        console.log(error)
    }
};

export const signin = (formData: FormData, history: History<unknown>) => async (dispatch: Dispatch) => {
    try {
        // sign in user

        // redirect user to /
        history.push('/');
    } catch (error: unknown) {
        console.log(error)
    }
};

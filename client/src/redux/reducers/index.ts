import { combineReducers } from "redux";

import trails from './trails';
import auth from './auth';

// combine reducers

export const rootReducer = combineReducers({
    trails,
    auth,
});

export type RootState = ReturnType<typeof rootReducer>
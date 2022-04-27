import { combineReducers } from "redux";

import trails from './trails';

// combine reducers

export const rootReducer = combineReducers({
    trails,
});

export type RootState = ReturnType<typeof rootReducer>
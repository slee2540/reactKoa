import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import { penderReducer } from 'redux-pender';

const reducers = combineReducers({
    base,
    auth,
    pender: penderReducer
});

export default reducers;
import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';

import { penderReducer } from 'redux-pender';

const reducers = combineReducers({
    base,
    auth,
    user,
    pender: penderReducer
});

export default reducers;
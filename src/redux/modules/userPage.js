import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { pender } from 'redux-pender';
import * as UsersAPI from 'lib/api/users';

const GET_USER_INFO = 'userPage/GET_USER_INFO';

export const getUserInfo = createAction(GET_USER_INFO, UsersAPI.getUserInfo);

const initialState = {
  info: {
    profile: {
      thumbnail: null,
      username: null
    },
    thoughtCount: null
  }
};

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_USER_INFO,
      onSuccess: (state, action) =>
        produce(state, draft => {
          // console.log(action.payload.data);
          draft.info = action.payload.data;
        })
    })
  },
  initialState
);

import produce from "immer";
import { handleActions, createAction } from 'redux-actions';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY'; 
export const changeVisible = createAction(SET_HEADER_VISIBILITY);

const initialState = {
  header: {
    visible: true
  }
};

export default handleActions({
    [SET_HEADER_VISIBILITY]: (state, action) => produce(state, draft => {
      draft.header.visible = action.payload;
    }),
}, initialState);


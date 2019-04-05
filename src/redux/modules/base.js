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
      // console.log(action.payload)
      draft.header.visible = action.payload;
    }),
}, initialState);

// const base = (state = initialState, action) => produce(state, draft => {
//   switch (action.type) {
//     case SET_HEADER_VISIBILITY:
//       console.log("이쪽"+action.header.visible)
//       return draft.header.visible = action.header.visible;
//     default:
//       return state;
//   }
// })

// export default base;


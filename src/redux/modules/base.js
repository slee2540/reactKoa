import produce from "immer";
// import { Map } from 'immutable';
// import { handleActions, createAction } from 'redux-actions';
// const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY'; // 헤더 렌더링 여부 설정
// export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY); // visible
// export default handleActions({
//     [SET_HEADER_VISIBILITY]: (state, action) => state.setIn(['header', 'visible'], action.payload)
// }, initialState);

const initialState = {
  header: {
    visible: true
  }
};


const graph = (state = initialState, action) => produce(state, draft => {

})

export default graph;


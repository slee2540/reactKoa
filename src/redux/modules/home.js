import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { pender } from 'redux-pender';
import * as PostsAPI from 'lib/api/posts';

// action types
const CHANGE_WRITE_POST_INPUT = 'home/CHANGE_WRITE_POST_INPUT'; // 인풋 내용 수정
const WRITE_POST = 'home/WRITE_POST'; // 포스트 작성

// action creator
export const changeWritePostInput = createAction(CHANGE_WRITE_POST_INPUT); // value
export const writePost = createAction(WRITE_POST, PostsAPI.write); // content
// initial state
const initialState = {
  writePost: {
    value: ''
  }
};

// reducer
export default handleActions(
  {
    [CHANGE_WRITE_POST_INPUT]: (state, action) =>
      produce(state, draft => {
        draft.writePost.value = action.payload;
      }),
    ...pender({
      type: WRITE_POST,
      onPending: state =>
        produce(state, draft => {
          draft.writePost.value = '';
        })
    })
  },
  initialState
);

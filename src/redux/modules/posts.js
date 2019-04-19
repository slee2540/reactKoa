import { createAction, handleActions } from 'redux-actions';

// import { Map, List, fromJS } from 'immutable';
import * as PostsAPI from 'lib/api/posts';
import { pender } from 'redux-pender';
import produce from 'immer';

const LOAD_POST = 'posts/LOAD_POST'; // 포스트 리스트 초기 로딩

export const loadPost = createAction(LOAD_POST, PostsAPI.list);

const initialState = {
  next: '',
  data: {}
};

export default handleActions(
  {
    ...pender({
      type: LOAD_POST,
      onSuccess: (state, action) =>
        produce(state, draft => {
          draft.next = action.payload.data.next;
          draft.data = action.payload.data.data;
        })
      // ...pender({
      //   type: WRITE_POST,
      //   onPending: state =>
      //     produce(state, draft => {
      //       draft.writePost.value = '';
      //     })
      // })
    })
  },
  initialState
);

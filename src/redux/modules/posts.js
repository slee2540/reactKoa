import { createAction, handleActions } from 'redux-actions';

// import { Map, List, fromJS } from 'immutable';
import * as PostsAPI from 'lib/api/posts';
import { pender } from 'redux-pender';
import produce from 'immer';

const LOAD_POST = 'posts/LOAD_POST'; // 포스트 리스트 초기 로딩
const PREFETCH_POST = 'posts/PREFETCH_POST'; // 포스트 미리 로딩
const SHOW_PREFETCHED_POST = 'posts/SHOW_PREFETCHED_POST'; // 미리 로딩된 포스트 화면에 보여주기
const RECEIVE_NEW_POST = 'posts/RECEIVE_NEW_POST'; // 새 데이터 수신

const LIKE_POST = 'posts/LIKE_POST'; // 포스트 좋아요
const UNLIKE_POST = 'posts/UNLIKE_POST'; // 포스트 좋아요 취소

export const loadPost = createAction(LOAD_POST, PostsAPI.list);
export const prefetchPost = createAction(PREFETCH_POST, PostsAPI.next); // URL
export const showPrefetchedPost = createAction(SHOW_PREFETCHED_POST);

export const likePost = createAction(LIKE_POST, PostsAPI.like, payload => payload); // postId 를 meta 값으로 설정
export const unlikePost = createAction(UNLIKE_POST, PostsAPI.unlike, payload => payload); // postId 를 meta 값으로 설정

const initialState = {
  next: '',
  data: {},
  nextData: {}
};

export default handleActions(
  {
    ...pender({
      type: LOAD_POST,
      onSuccess: (state, action) =>
        produce(state, draft => {
          // console.log(action.payload);
          draft.next = action.payload.data.next;
          draft.data = action.payload.data.data;
        })
    }),
    ...pender({
      type: PREFETCH_POST,
      onSuccess: (state, action) =>
        produce(state, draft => {
          // console.log(action.payload);
          draft.next = action.payload.data.next;
          draft.nextData = action.payload.data.data;
        })
    }),
    [SHOW_PREFETCHED_POST]: state =>
      produce(state, draft => {
        // data 의 뒷부분에 nextData 를 붙여주고,
        // 기존의 nextData 는 비워줍니다.
        if (state.nextData.length > 1) {
          draft.data = state.data.concat(state.nextData);
          draft.nextData = {};
        }
      }),
    [RECEIVE_NEW_POST]: (state, action) =>
      produce(state, draft => {
        // data 의 뒷부분에 nextData 를 붙여주고,
        // 기존의 nextData 는 비워줍니다.
        // console.log(state.data);
        // console.log(action.payload);
        const appendData = action.payload;
        const copyObj = state.data.slice(0);
        copyObj.splice(0, 0, appendData);
        draft.data = copyObj;
      }),

    ...pender({
      type: LIKE_POST,
      onPending: (state, action) =>
        produce(state, draft => {
          const index = state.data.findIndex(post => post._id === action.meta);
          console.log(action.meta, index);
          draft.data[index].liked = true;
          draft.data[index].likedCount += 1;
        }),
      onSuccess: (state, action) =>
        produce(state, draft => {
          const index = state.data.findIndex(post => post._id === action.meta);
          draft.data[index].likedCount = action.payload.data.likesCount;
        })
    }),
    ...pender({
      type: UNLIKE_POST,
      onPending: (state, action) =>
        produce(state, draft => {
          const index = state.data.findIndex(post => post._id === action.meta);
          draft.data[index].liked = false;
          draft.data[index].likedCount -= 1;
        }),
      onSuccess: (state, action) =>
        produce(state, draft => {
          const index = state.data.findIndex(post => post._id === action.meta);
          draft.data[index].likedCount = action.payload.data.likesCount;
        })
    })
  },
  initialState
);

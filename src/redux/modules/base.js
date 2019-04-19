import produce from 'immer';
import { handleActions, createAction } from 'redux-actions';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';
const SET_USER_MENU_VISIBILITY = 'base/SET_USER_MENU_VISIBILITY'; // 유저메뉴 렌더링 여부 설정
export const changeVisible = createAction(SET_HEADER_VISIBILITY);
export const setUserMenuVisibility = createAction(SET_USER_MENU_VISIBILITY); // visible

const initialState = {
  header: {
    visible: true
  },
  userMenu: {
    visible: false
  }
};

export default handleActions(
  {
    [SET_HEADER_VISIBILITY]: (state, action) =>
      produce(state, draft => {
        draft.header.visible = action.payload;
      }),
    [SET_USER_MENU_VISIBILITY]: (state, action) =>
      produce(state, draft => {
        draft.userMenu.visible = action.payload;
      })
  },
  initialState
);

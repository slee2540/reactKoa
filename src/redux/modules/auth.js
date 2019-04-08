import produce from "immer";
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';

const SET_ERROR = 'auth/SET_ERROR'; // 오류 설정
const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER'; // 이메일 가입
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN'; // 이메일 로그인
const LOGOUT = 'auth/LOGOUT'; // 로그아웃
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS'; // 이메일 중복 확인
const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS'; // 아이디 중복 확인

export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form 
export const setError = createAction(SET_ERROR); // { form, message }
export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister); // { email, username, password }
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // { email, password }
export const logout = createAction(LOGOUT, AuthAPI.logout);
export const checkEmailExists = createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists); // email
export const checkUsernameExists = createAction(CHECK_USERNAME_EXISTS, AuthAPI.checkUsernameExists); // username

const initialState ={
  register:{
    form: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    },
    exists: {
      email: false,
      password: false
    },
    error: null
  },
  login:{
    form: {
      email: '',
      password: ''
    },
    error: null
  },
  result: {}
};

export default handleActions({
    [CHANGE_INPUT]: (state, action) => produce(state, draft =>{
      if(action.payload.form==="login"){
        // draft.login = action.payload;
        draft.login.form[action.payload.name]= action.payload.value;
      }else{
        draft.register.form[action.payload.name]= action.payload.value;
      }
    }),
    [INITIALIZE_FORM]: (state, action) => produce(state, draft =>{
      draft = initialState;
    }),
    [SET_ERROR]: (state, action) => produce(state, draft =>{
      if(action.payload.form==="login"){
        draft.login.error = action.payload.message;
      }else{
        draft.register.error = action.payload.message;
      }
      // console.log(action.payload)
    }),
    ...pender({
      type: LOCAL_LOGIN,
      onSuccess: (state, action) => produce(state,draft =>{
        // state.set('result', Map(action.payload.data))
        draft.result = action.payload.data
      })
    }),
    ...pender({
      type: LOCAL_REGISTER,
      onSuccess: (state, action) => produce(state,draft =>{
        // state.set('result', Map(action.payload.data))
        draft.result = action.payload.data
      })
    }),
    ...pender({
      type: CHECK_EMAIL_EXISTS,
      onSuccess: (state, action) => produce(state,draft =>{
        // state.set('result', Map(action.payload.data))
        draft.register.exists.email = action.payload.data.exists
      })
      // onSuccess: (state, action) => state.setIn(['register', 'exists', 'email'], action.payload.data.exists)
    }),
    ...pender({
        type: CHECK_USERNAME_EXISTS,
        onSuccess: (state, action) => produce(state,draft =>{
          // state.set('result', Map(action.payload.data))
          draft.register.exists.username = action.payload.data.exists
        })
        // onSuccess: (state, action) => state.setIn(['register', 'exists', 'username'], action.payload.data.exists)
    })
}, initialState);


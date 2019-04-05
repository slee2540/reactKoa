import React, { Component } from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from 'redux/modules/auth';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from "components/Auth";

class Login extends Component {

  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm('login')
  }

  handleChange = (e) => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;
    // console.log(name,value)
    AuthActions.changeInput({
      name,
      value,
      form: 'login'
    });
  }

  render() {
    const { email, password } = this.props.form; // form 에서 email 과 password 값을 읽어옴
    const { handleChange } = this;

    return (
      <AuthContent title="로그인">
        <InputWithLabel 
          label="이메일"
          name="email" 
          placeholder="이메일" 
          value={email} 
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password} 
          // autocomplete="new-password"
          onChange={handleChange}
        />
        <AuthButton>로그인</AuthButton>
        <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
      </AuthContent>
    );
  }
}

// export default Login;

export default connect(
  (state) => ({
    form: state.auth.login.form
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Login);
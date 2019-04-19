import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import * as authActions from 'redux/modules/auth';
import * as userActions from 'redux/modules/user';
import storage from 'lib/storage';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from 'components/Auth';

class Login extends Component {
  componentDidMount() {
    const { location } = this.props;
    const query = queryString.parse(location.search);

    if (query.expired !== undefined) {
      this.setError('세션에 만료되었습니다. 다시 로그인하세요.');
    }
  }

  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm('login');
  }

  handleChange = e => {
    const { AuthActions } = this.props;
    const { name, value } = e.target;
    // console.log(name,value)
    AuthActions.changeInput({
      name,
      value,
      form: 'login'
    });
  };

  setError = message => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: 'login',
      message
    });
    return false;
  };

  handleLocalLogin = async () => {
    const { form, AuthActions, UserActions, history } = this.props;
    const { email, password } = form;

    try {
      // const result = await AuthActions.localLogin({ email, password });
      // const loggedInfo = result.data;
      // console.log('전', result);
      const result = await AuthActions.localLogin({ email, password });
      // console.log('후', result.data);
      const loggedInfo = result.data;
      // await UserActions.addPost();s
      // console.log(re);
      UserActions.setLoggedInfo(loggedInfo); // redux에서 값변경
      history.push('/');
      storage.set('loggedInfo', loggedInfo);
    } catch (e) {
      this.setError('잘못된 계정정보입니다.');
    }
  };

  render() {
    const { form } = this.props; // form 에서 email 과 password 값을 읽어옴
    const { email, password } = form;
    const { handleChange, handleLocalLogin } = this;
    const { error } = this.props;

    return (
      <AuthContent title="로그인">
        <InputWithLabel label="이메일" name="email" placeholder="이메일" value={email} onChange={handleChange} />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          // autocomplete="new-password"
          onChange={handleChange}
        />
        {error && <AuthError>{error}</AuthError>}
        <AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
        <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
      </AuthContent>
    );
  }
}

// export default Login;

export default connect(
  state => ({
    form: state.auth.login.form,
    error: state.auth.login.error,
    result: state.auth.result
  }),
  dispatch => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Login);

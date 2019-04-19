import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import storage from 'lib/storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/modules/user';
import { ToastContainer } from 'react-toastify';
import HeaderContainer from './containers/Base/HeaderContainer';
import { Home, Auth } from './pages';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
  componentDidMount() {
    this.initializeUserInfo();
  }

  initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if (!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

    const { UserActions } = this.props;
    UserActions.setLoggedInfo(loggedInfo);
    try {
      await UserActions.checkStatus();
    } catch (e) {
      storage.remove('loggedInfo');
      window.location.href = '/auth/login?expired';
    }
  };

  render() {
    return (
      <div>
        <HeaderContainer />
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <ToastContainer style={{ zIndex: 20 }} hideProgressBar position="bottom-right" />
      </div>
    );
  }
}

// export default App;

export default connect(
  null,
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(App);

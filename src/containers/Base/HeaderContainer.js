import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginButton from 'components/Base/Header/LoginButton';
import Header from 'components/Base/Header/Header';
import * as userActions from 'redux/modules/user';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';

class HeaderContainer extends Component {
  handleLogout = async () => {
    const { UserActions } = this.props;
    try {
        await UserActions.logout();
    } catch (e) {
        console.log(e);
    }

    storage.remove('loggedInfo');
    window.location.href = '/'; // 홈페이지로 새로고침
  }

  render() {
    const { visible, user } = this.props;
    if(!visible) return null;
    
    return (
      <Header>
        {
          user.logged? 
          (<div>
            {user.loggedInfo.username} <div onClick={this.handleLogout}>(로그아웃)</div>
          </div>)
          : <LoginButton />
        }
        {/* <LoginButton /> */}
      </Header>
    );
  }
}

export default connect(
  (state) => ({
    // visible: state.base.getIn(['header', 'visible'])
    visible: state.base.header.visible,
    user: state.user
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(HeaderContainer);
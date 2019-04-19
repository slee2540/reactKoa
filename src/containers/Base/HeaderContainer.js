import React, { Component } from 'react';
import Header, { LoginButton, UserThumbnail } from 'components/Base/Header';
import { connect } from 'react-redux';
import * as userActions from 'redux/modules/user';
import * as baseActions from 'redux/modules/base';
import { bindActionCreators } from 'redux';
import UserMenuContainer from './UserMenuContainer';

class HeaderContainer extends Component {
  state = {
    thumbnailClick: false
  };

  handleThumbnailClick = () => {
    const { BaseActions } = this.props;
    const { thumbnailClick } = this.state;
    this.setState({ thumbnailClick: !thumbnailClick });

    if (thumbnailClick === true) {
      BaseActions.setUserMenuVisibility(false);
    } else {
      BaseActions.setUserMenuVisibility(true);
    }
  };

  render() {
    const { visible, user } = this.props;
    const { handleThumbnailClick } = this;
    if (!visible) return null;

    return (
      <Header>
        {user.logged ? (
          <div>
            <UserThumbnail thumbnail={user.loggedInfo.thumbnail} onClick={handleThumbnailClick} />
          </div>
        ) : (
          <LoginButton />
        )}
        <UserMenuContainer />
      </Header>
    );
  }
}

export default connect(
  state => ({
    visible: state.base.header.visible,
    // userVisible: state.base.userMenu.visible,
    user: state.user
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(HeaderContainer);

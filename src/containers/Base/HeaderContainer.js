

import React, { Component } from "react";
import Header, { LoginButton, UserThumbnail } from "components/Base/Header";
import { connect } from "react-redux";
import * as userActions from "redux/modules/user";
import * as baseActions from "redux/modules/base";
import { bindActionCreators } from "redux";
import UserMenuContainer from "./UserMenuContainer";

class HeaderContainer extends Component {
  state ={
    thumbnailClick: false
  }

  handleThumbnailClick = () => {
    const { BaseActions} = this.props;
    const {thumbnailClick} = this.state;
    this.setState({thumbnailClick:!thumbnailClick})
    // BaseActions.setUserMenuVisibility(visible);
    // userVisible===true? BaseActions.setUserMenuVisibility(false):BaseActions.setUserMenuVisibility(true);    
    thumbnailClick===true? BaseActions.setUserMenuVisibility(false):BaseActions.setUserMenuVisibility(true);    
    // BaseActions.setUserMenuVisibility(true);
    // console.log(userVisible, visible)
  };

  render() {
    const { visible, user } = this.props;
    const { handleThumbnailClick } = this;

    if (!visible) return null;

    return (
      <Header>
        {user.logged? 
          (<div>
            <UserThumbnail thumbnail={user.loggedInfo.thumbnail} onClick={handleThumbnailClick}/>
          </div>)
          : <LoginButton />
        }
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






// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import UserThumbnail from 'components/Base/Header/UserThumbnail';
// import LoginButton from 'components/Base/Header/LoginButton';
// import Header from 'components/Base/Header/Header';
// import UserMenuContainer from './UserMenuContainer';
// import * as userActions from 'redux/modules/user';
// import * as baseActions from 'redux/modules/base';
// import { bindActionCreators } from 'redux';
// // import storage from 'lib/storage';

// class HeaderContainer extends Component {

//   handleThumbnailClick = () => {
//     const { BaseActions } = this.props;
//     BaseActions.setUserMenuVisibility(true);
//   }

//   // handleLogout = async () => {
//   //   const { UserActions } = this.props;
//   //   try {
//   //       await UserActions.logout();
//   //   } catch (e) {
//   //       console.log(e);
//   //   }

//   //   storage.remove('loggedInfo');
//   //   window.location.href = '/'; // 홈페이지로 새로고침
//   // }

//   render() {
//     const { visible, user } = this.props;
//     const { handleThumbnailClick } = this;

//     if (!visible) return null;
    
//     return (
//       <Header>
//         {
//           user.logged? 
//           (<div>
//             {/* {user.loggedInfo.username} <div onClick={this.handleLogout}>(로그아웃)</div> */}
//             <UserThumbnail thumbnail={user.loggedInfo.thumbnail} onClick={handleThumbnailClick}/>
//           </div>)
//           : <LoginButton />
//         }
//         <UserMenuContainer eventTypes="click"/>
//         {/* <LoginButton /> */}
//       </Header>
//     );
//   }
// }

// export default connect(
//   (state) => ({
//     // visible: state.base.getIn(['header', 'visible'])
//     visible: state.base.header.visible,
//     user: state.user
//   }),
//   (dispatch) => ({
//     BaseActions: bindActionCreators(baseActions, dispatch),
//     UserActions: bindActionCreators(userActions, dispatch)
//   })
// )(HeaderContainer);
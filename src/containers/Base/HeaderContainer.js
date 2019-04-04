import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginButton from 'components/Base/Header/LoginButton';
import Header from 'components/Base/Header/Header';

class HeaderContainer extends Component {
  render() {
    const { visible } = this.props;
    if (!visible) return null;
    // console.log(visible)

    return (
      <Header>
        <LoginButton />
      </Header>
    );
  }
}

export default connect(
  (state) => ({
      // visible: state.base.getIn(['header', 'visible'])
      visible: state.base.header.visible
  }),
  (dispatch) => ({

  })
)(HeaderContainer);
import React, { Component } from 'react';
import PostList from 'components/Shared/PostList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from 'redux/modules/posts';

class PostListContainer extends Component {
  componentDidMount() {
    // 컴포넌트가 마운트 됐을 때 호출 합니다.
    this.load();
  }

  load = async () => {
    // 가장 최근 작성된 포스트 20개를 불러옵니다.
    const { PostsActions } = this.props;
    PostsActions.loadPost();
  };

  render() {
    const { data } = this.props;

    if (data.length > 0) {
      return <PostList posts={data} />;
    }
    return null;
  }
}

export default connect(
  state => ({
    next: state.posts.next,
    data: state.posts.data
  }),
  dispatch => ({
    PostsActions: bindActionCreators(postsActions, dispatch)
  })
)(PostListContainer);

import React, { Component } from 'react';
import PostList from 'components/Shared/PostList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postsActions from 'redux/modules/posts';
import { toast } from 'react-toastify';
import { setRelayoutHandler } from 'lib/withRelayout';

class PostListContainer extends Component {
  prev = null;

  componentDidMount() {
    this.load();
    window.addEventListener('scroll', this.handleScroll);
    setRelayoutHandler(this.handleRelayout);
  }

  componentDidUpdate(prevProps, prevState) {
    // username 이 변경되면 this.load 를 호출합니다
    if (prevProps.username !== this.props.username) {
      this.load();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleRelayout = () => {
    setTimeout(() => this.masonry.masonry.layout(), 0);
  };

  load = async () => {
    // 가장 최근 작성된 포스트 20개를 불러옵니다.
    const { PostsActions, username } = this.props;

    try {
      // const result = await this.newMethod(PostsActions);
      // console.log(result);
      await PostsActions.loadPost(username);
      const { next } = this.props;

      // console.log(`Next : ${next}`);

      if (next) {
        // 다음 불러올 포스트들이 있다면 미리 로딩을 해둔다
        await PostsActions.prefetchPost(next);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 다음 목록 불러오기
  loadNext = async () => {
    const { PostsActions, next } = this.props;
    PostsActions.showPrefetchedPost(); // 미리 불러왔던걸 보여준 다음에
    if (next === this.prev || !next) return; // 이전에 했던 요청과 동일하면 요청하지 않는다.
    this.prev = next;

    // 다음 데이터 요청
    try {
      await PostsActions.prefetchPost(next);
    } catch (e) {
      console.log(e);
    }
    this.handleScroll(); // 한번 더 호출함으로써, 인터넷 느린 상황에 밀리는 현상 방지
  };

  // 스크롤 리스너
  handleScroll = () => {
    const { nextData } = this.props;
    // console.log(`스크롤Next :${nextData}`);
    if (nextData.size === 0) return; // 미리 불러온 데이터 없으면 작업 중지

    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE 에서는 body.scrollTop 대신에 document.documentElement.scrollTop 사용해야함
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 100) {
      this.loadNext();
    }
  };

  handleToggleLike = ({ postId, liked }) => {
    const { PostsActions, logged } = this.props;

    const messages = message => <div style={{ fontSize: '1.1rem' }}>{message}</div>;
    if (!logged) {
      return toast(messages('로그인 후 이용 하실 수 있습니다.'), { type: 'error' });
    }
    if (liked) {
      return PostsActions.unlikePost(postId);
    }
    return PostsActions.likePost(postId);
  };

  handleCommentClick = postId => {
    const { PostsActions } = this.props;
    // console.log(`이쪽: ${liked}`);
    PostsActions.toggleComment(postId);
    setTimeout(() => this.masonry.masonry.layout(), 0);
  };

  render() {
    const { data } = this.props;
    const { handleToggleLike, handleCommentClick } = this;

    if (data.length > 0) {
      return <PostList posts={data} onToggleLike={handleToggleLike} onCommentClick={handleCommentClick} masonryRef={ref => (this.masonry = ref)} />;
    }
    return null;
  }
}

export default connect(
  state => ({
    next: state.posts.next,
    data: state.posts.data,
    nextData: state.posts.nextData,
    logged: state.user.logged
  }),
  dispatch => ({
    PostsActions: bindActionCreators(postsActions, dispatch)
  })
)(PostListContainer);

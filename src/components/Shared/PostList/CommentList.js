import React, { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import withRelayout from 'lib/withRelayout';
import Comment from './Comment';

const CommentListwrapper = styled.div`
  margin-top: 0.75rem;
`;

const ReadMore = styled.div`
  color: ${oc.gray[6]};
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${oc.cyan[6]};
    font-weight: 500;
  }
`;

class CommentList extends Component {
  state = {
    limit: 5
  };

  handleReadMore = () => {
    const { limit } = this.state;
    const { onRelayout } = this.props;
    this.setState({
      limit: limit + 10
    });
    onRelayout();
    // console.log('이쪽');
  };

  render() {
    const { comments } = this.props;
    if (comments.size === 0) return null; // 덧글이 비어있다면 아무것도 렌더링하지 않습니다.
    const { limit } = this.state;
    const { handleReadMore } = this;

    const commentList = comments.slice(0, limit).map(comment => <Comment {...comment} key={comment._id} />);
    // console.log(limit, comments, commentList);
    return (
      <CommentListwrapper>
        {commentList}
        {limit < comments.length ? <ReadMore onClick={handleReadMore}>{comments.length - limit}개 더 보기</ReadMore> : null}
      </CommentListwrapper>
    );
  }
}

export default withRelayout(CommentList);

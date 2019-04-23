import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';
import Post from './Post';

const Wrapper = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const PostList = ({ posts, onToggleLike, onCommentClick, masonryRef }) => {
  const postList = posts.map(post => {
    // eslint-disable-next-line no-underscore-dangle
    return <Post key={post._id} post={post} onToggleLike={onToggleLike} onCommentClick={onCommentClick} />;
  });

  return (
    <Wrapper>
      {
        <Masonry options={{ gutter: 16 }} ref={masonryRef}>
          {postList}
        </Masonry>
      }
    </Wrapper>
  );
};

export default PostList;

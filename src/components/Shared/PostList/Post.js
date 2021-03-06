import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

// Timeago 라이브러리 관련 코드 불러오기
import TimeAgo from 'react-timeago';
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { media, shadow } from 'lib/styleUtils';
import scuize from 'lib/scuize';
import CommentBlockContainer from 'containers/Shared/PostList/CommentBlockContainer';
import PostFooter from './PostFooter';

const formatter = buildFormatter(koreanStrings); // 한글 형식으로 보여주기 위해 필요

const Wrapper = styled.div`
  width: calc((100% - 32px) / 3);
  ${media.desktop`
        width: calc((100% - 16px) / 2);
    `}
  ${media.tablet`
        width: 100%;
    `}
    margin-bottom: 1rem;
  background: white;
  ${shadow(1)}
`;

// 포스트 상단, 썸네일, 생각번호, 시간을 래핑합니다
// 자식들을 한 줄로 나열시켜줍니다
const PostHead = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${oc.gray[2]};
`;

// images props 로 전달받은 썸네일을 32*32 사이즈로 보여줍니다
const UserThumbnail = styled.div`
  background: ${oc.gray[2]};
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

// 유저네임을 띄워줍니다
const Username = styled(Link)`
  font-weight: 500;
  margin-left: 0.3rem;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
`;

// 몇번째 생각인지 알려줍니다
const Count = styled.div`
  color: ${oc.gray[6]};
  margin-left: 0.3rem;
  font-size: 0.8rem;
`;

// 얼마나 전에 작성됐는지 알려줍니다
const Time = styled.div`
  color: ${oc.gray[4]};
  font-size: 0.8rem;
  margin-left: auto;
`;

// 포스트 내용을 보여줍니다
const Content = styled.div`
  font-size: 1.25rem;
  color: ${oc.gray[8]};
  font-weight: 300;
  padding: 1rem;
  word-break: break-all;
  white-space: pre-wrap;
`;
const Post = ({ post, onToggleLike, onCommentClick }) => {
  const { _id, count, username, content, comments, likesCount, liked, createdAt } = post;

  const toggleLike = () =>
    onToggleLike({
      postId: _id,
      liked
    });
  const commentClick = () => onCommentClick(_id);

  return (
    <Wrapper>
      <PostHead>
        <UserThumbnail image={`/api/users/${username}/thumbnail`} />
        <Username to={`/@${username}`}>{username}</Username>
        <Count>#{count}번째 생각</Count>
        <Time>
          <TimeAgo date={createdAt} formatter={formatter} />
        </Time>
      </PostHead>
      <Content>{content}</Content>
      <PostFooter likesCount={likesCount} liked={liked} onToggleLike={toggleLike} onCommentClick={commentClick} comments={comments} />
      <CommentBlockContainer post={post} />
    </Wrapper>
  );
};

// export default Post;

export default scuize(Post, function(nextProps, nextState) {
  return this.props.post !== nextProps.post; // 포스트가 변경되었을때만 리렌더링
});

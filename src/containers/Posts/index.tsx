import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsService } from '../../services/postsService';
import { postsSelector } from '../../app/reducers/postsReducer';
import Spinner from '../../components/Spinner';
import Post from '../../components/Post';
import './Posts.scss';

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, commentCount } = useSelector(postsSelector);

  useEffect(() => {
    dispatch(getPostsService());
  }, [dispatch]);

  if (error !== '')
    return (
      <div className="posts-error">
        <h2 className="posts-error__title">{error}</h2>
      </div>
    );

  return (
    <div className="posts-container">
      {loading ? <Spinner /> : posts.map(post => <Post {...post} commentCounts={commentCount} key={post.id} />)}
    </div>
  );
};

export default Posts;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsService } from '../../services/postsService';
import { postsSelector } from '../../app/reducers/postsReducer';
import Spinner from '../../components/Spinner';
import Post from '../../components/Post';
import './Posts.scss';

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector(postsSelector);

  useEffect(() => {
    dispatch(getPostsService());
  }, [dispatch]);

  return <div className="posts-container">{loading ? <Spinner /> : posts.map(post => <Post {...post} />)}</div>;
};

export default Posts;

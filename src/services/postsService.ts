import axios from '../axios-config';
import { Dispatch } from '@reduxjs/toolkit';
import { getPosts, getPostsFailed, getPostsSuccess, cleanError } from '../app/reducers/postsReducer';

export const getPostsService = () => (dispatch: Dispatch) => {
  dispatch(cleanError());
  dispatch(getPosts());
  axios
    .get('/posts')
    .then((res: any) => {
      if (res.data) dispatch(getPostsSuccess({posts: res.data}));
      else throw new Error('Error getting posts from the BE');
    })
    .catch(err => {
      dispatch(getPostsFailed({error: err?.message}));
    })
};

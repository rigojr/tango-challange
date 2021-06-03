import axios from '../axios-config';
import { Dispatch } from '@reduxjs/toolkit';
import { getPosts, getPostsFailed, getPostsSuccess, cleanError } from '../app/reducers/postsReducer';
import { IComment, IPost } from '../common/type';

export const getPostsService = () => (dispatch: Dispatch) => {
  dispatch(cleanError());
  dispatch(getPosts());
  const getArray = [axios.get('/posts'), axios.get('/comments')];
  Promise.all(getArray)
    .then(values => {
      if (values[0].data && values[1].data) {
        const posts = values[0].data;
        values[1].data.forEach((comment: IComment) => {
          const indexPostId = comment.postId - 1;
          const rawPost: IPost = posts[indexPostId];
          if (rawPost) {
            const tempPost: IPost = {
              ...rawPost,
              comments: [...(rawPost.comments ?? []), comment],
            };
            posts[indexPostId] = tempPost;
          }
        });
        dispatch(getPostsSuccess({ posts }));
      } else throw new Error('Error getting posts and/or comments from the BE');
    })
    .catch(err => {
      dispatch(getPostsFailed({ error: err?.message }));
    });
};

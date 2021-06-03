import axios from '../axios-config';
import { Dispatch } from '@reduxjs/toolkit';
import { getPosts, getPostsFailed, getPostsSuccess, cleanError } from '../app/reducers/postsReducer';
import { IComment, IPost } from '../common/type';

/**
 * In order to match all the comments and seeing that the PostId
 * comes in order from the EPs, I decide to add a Promise All in order
 * to wait comments and posts and matching them. Using the PostId, I just
 * Index the Post and add its comments in order to avoid heavy functions.
 */

export const getPostsService = () => (dispatch: Dispatch) => {
  dispatch(cleanError());
  dispatch(getPosts());
  const getArray = [axios.get('/posts'), axios.get('/comments')];
  Promise.all(getArray)
    .then(values => {
      if (values[0].data && values[1].data) {
        const posts = values[0].data;
        let commentCount = 0;
        values[1].data.forEach((comment: IComment) => {
          const indexPostId = comment.postId - 1;
          const rawPost: IPost = posts[indexPostId];
          if (rawPost) {
            commentCount += 1;
            const tempPost: IPost = {
              ...rawPost,
              comments: [...(rawPost.comments ?? []), comment],
            };
            posts[indexPostId] = tempPost;
          }
        });
        dispatch(getPostsSuccess({ posts, commentCount }));
      } else throw new Error('Error getting posts and/or comments from the BE');
    })
    .catch(err => {
      dispatch(getPostsFailed({ error: err?.message }));
    });
};

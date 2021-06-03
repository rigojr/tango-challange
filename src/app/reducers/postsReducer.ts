import { createSlice } from '@reduxjs/toolkit';
import { IPost, IRtkState } from '../../common/type';

interface PostsState extends IRtkState {
  posts: IPost[];
  commentCount: number;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
  commentCount: 0
};

const postsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {
    // GET
    getPosts: state => {
      state.loading = true;
    },
    getPostsSuccess: (state, { payload }) => {
      const { posts, commentCount } = payload;
      state.posts = posts;
      state.loading = false;
      state.commentCount = commentCount;
    },
    getPostsFailed: (state, { payload }) => {
      const { error } = payload;
      state.error = error;
      state.loading = false;
    },
    // ADD COMMENT
    addComment: (state, { payload }) => {
      const { postId, comment } = payload;
      state.posts[postId] = {
        ...state.posts[postId],
        comments: [...(state.posts[postId].comments ?? []), comment],
      };
    },
    // UTILS
    cleanError: state => {
      state.error = '';
    },
  },
});

export const postsSelector = (state: { postsReducer: PostsState }) => state.postsReducer;

export const { getPosts, getPostsSuccess, getPostsFailed, cleanError, addComment } = postsSlice.actions;

export default postsSlice.reducer;

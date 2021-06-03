import { createSlice } from '@reduxjs/toolkit';
import { IPost, IRtkState } from '../../common/type';

interface PostsState extends IRtkState {
  posts: IPost[];
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: '',
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
      const { posts } = payload;
      console.log(posts);
      state.posts = posts;
      state.loading = false;
    },
    getPostsFailed: (state, { payload }) => {
      const { error } = payload;
      state.error = error;
      state.loading = false;
    },
    // UTILS
    cleanError: state => {
      state.error = '';
    },
  },
});

export const postsSelector = (state: { postsReducer: PostsState }) => state.postsReducer;

export const { getPosts, getPostsSuccess, getPostsFailed, cleanError } = postsSlice.actions;

export default postsSlice.reducer;

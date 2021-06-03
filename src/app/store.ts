import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from './reducers/postsReducer';

export const store = configureStore({
  reducer: {
    postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { createSlice, Slice } from '@reduxjs/toolkit';
import { TPost } from '../../components/Post';

export const POST_COUNT_PER_REQUEST = 5;

export type TNewsFeedState = {
  hasMoreNews: boolean;
  items: Array<TPost>;
  lastPostID?: number;
  loading?: boolean;
  error?: Error;
}

const initialState: TNewsFeedState = {
  loading: false,
  hasMoreNews: true,
  items: []
}

export const newsFeedSlice: Slice = createSlice({
  name: 'newsfeed', initialState, reducers: {
    fetchLatestNews: (state) => ({...state, items: [], error: null, loading: true }),
    fetchFollowingNews: (state) => ({ ...state, error: null, loading: true }),
    fetchFailure: (state, action) => ({...state, error: action.payload, loading: false}),
    fetchSuccess: (state, action) => {
      const items = action.payload;
      if (items.length < POST_COUNT_PER_REQUEST) state.hasMoreNews = false;
      state.items.push(...items);
      state.lastPostID = items[items.length-1].id;
      state.error = null;
      state.loading = false;
    },
  }
});

export const { fetchLatestNews, fetchFollowingNews, fetchFailure, fetchSuccess } = newsFeedSlice.actions;

export default newsFeedSlice.reducer;
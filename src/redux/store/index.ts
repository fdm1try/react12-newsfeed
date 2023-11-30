import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { newsFeedSlice, TNewsFeedState } from '../slices/newsFeedSlice';
import createSagaMiddleWare from 'redux-saga';
import saga from '../sagas';

const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
  reducer: {
    newsfeed: newsFeedSlice.reducer
  },
  devTools: true,
  enhancers: [
    compose(applyMiddleware(sagaMiddleWare)),
  ]
})

export type TRootState = {
  newsfeed: TNewsFeedState
}

sagaMiddleWare.run(saga);
export default store;

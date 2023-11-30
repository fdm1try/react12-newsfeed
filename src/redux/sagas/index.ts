import { spawn } from 'redux-saga/effects';
import { watchLatestNewsRequestSaga, watchFollowingNewsRequestSaga } from './newsFeedSaga';

export default function* saga() {
  yield spawn(watchLatestNewsRequestSaga);
  yield spawn(watchFollowingNewsRequestSaga);
}
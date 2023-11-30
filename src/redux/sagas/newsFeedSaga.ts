import { select, retry, takeLatest, put } from 'redux-saga/effects';
import { fetchNews } from '../../api';
import { TPost } from '../../components/Post';
import { TNewsFeedState, fetchLatestNews, fetchFollowingNews, fetchSuccess, fetchFailure } from '../slices/newsFeedSlice';


function* handleLatestNewsRequestSaga() {
  try {
    const data: Array<TPost> = yield retry(Number.MAX_SAFE_INTEGER, 3000, fetchNews);
    yield put(fetchSuccess(data));
  } catch (error) {
    if (!(error instanceof Error)) return;
    yield put(fetchFailure(error));
  }
}

function* handleFollowingNewsRequestSaga() {
  try {
    const state: TNewsFeedState = yield select((state) => state.newsfeed);
    const params = { lastSeenId: state.lastPostID };
    const data: Array<TPost> = yield retry(Number.MAX_SAFE_INTEGER, 3000, fetchNews, params);
    yield put(fetchSuccess(data));
  } catch (error) {
    if (!(error instanceof Error)) return;
    yield put(fetchFailure(error));
  }
}

export function* watchLatestNewsRequestSaga() {
  yield takeLatest(fetchLatestNews.toString(), handleLatestNewsRequestSaga);
}

export function* watchFollowingNewsRequestSaga() {
  yield takeLatest(fetchFollowingNews.toString(), handleFollowingNewsRequestSaga);
}
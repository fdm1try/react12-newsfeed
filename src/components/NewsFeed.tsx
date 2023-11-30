import {useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import moment from 'moment'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { fetchLatestNews, fetchFollowingNews } from '../redux/slices/newsFeedSlice';
import type { TRootState } from '../redux/store';
import { Post } from './Post';
import { Loader } from './Loader';

export const NewsFeed = () => {
  const useAppSelector : TypedUseSelectorHook<TRootState> = useSelector;
  const dispatch = useDispatch();

  const { items, loading, error, hasMoreNews } = useAppSelector((state) => state.newsfeed);

  function handleMoreNewsBtnClick() {
    if (!items.length || !hasMoreNews) return;
    dispatch(fetchFollowingNews(null));
  }

  useEffect(() => {
    if (error) 
      console.error(`${moment().format('HH:mm:ss.SSS')}:\tNewsfeed fetching failed with ${error}`)
  }, [error])

  useEffect(() => {
    dispatch(fetchLatestNews(null));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='newsfeed'>
      <div className='newsfeed__header'>

      </div>
      <div className='newsfeed__body'>
        {items?.map((item) => <Post key={item.id} item={item} />)}
      </div>
      {hasMoreNews && (
        <div className='newsfeed__footer'>        
          {loading && <Loader />}
          {!loading && items.length > 0 && (
            <Button onClick={handleMoreNewsBtnClick} variant='secondary'>
              К предыдущим записям
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

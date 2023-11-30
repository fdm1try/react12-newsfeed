import './Post.css';
import {useState } from 'react'
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { TAttachment, Attachment } from '../Attachment';
import { PostContent } from './PostContent';

type TCounter = {
  count: number;
}

export type TPost = {
  id: string;
  date: number;
  text: string;
  comments: TCounter;
  likes: TCounter;
  reposts: TCounter;
  views: TCounter;
  attachments: Array<TAttachment>;
}

export interface IPost {
  item: TPost;
}

export const POST_CONTENT_PREVIEW_LENGTH = 200;

moment.updateLocale('ru', {
  months : ['января', 'февраля', 'марта', 'апреля', 'июня', 'июля', 'августа', 'сентября', 'ноября', 'декабря']
});

export const Post: React.FC<IPost> = (props) => {
  const date = new Date(props.item.date * 1000);
  const [maxLength, setMaxLength] = useState<number>(POST_CONTENT_PREVIEW_LENGTH);
  const [textOverflow, setTextOverflow] = useState<boolean>(false);

  function handleShowMore() {
    setMaxLength(0);
  }

  function handleContentOverflow(isOverflow: boolean) {
    setTextOverflow(isOverflow);
  }

  const dateTime = () => moment(date).locale('ru').format('D MMMM YYYY HH:mm')


  return (
    <div className='post'>
      <div className='post__header'>
        <div className='post__image'></div>
        <div className='post__header_info'>
          <h3 className='post__title'>Университет интернет-профессий Нетология</h3>
          <span className='post__date'>{dateTime()}</span>
        </div>
      </div>
      <div className='post__body'>
        <PostContent onOverflowStateChanged={handleContentOverflow} maxLength={maxLength} text={props.item.text} />
        { textOverflow && (
          <Button onClick={handleShowMore} className='post__showmore-btn' variant='link'>
            Показать полностью...
          </Button>
        )}
      </div>
      <div className='post__attachments'>
        {props.item.attachments.map((attachment, i) => <Attachment key={`attachment-${i}`} item={attachment} />)}
      </div>
      <div className='post__footer'>
        <span className='post__likes'>
          <span className='icon'>♡</span> 
          {props.item.likes.count}
        </span>
        <span className='post__comments'>
          <span className='icon'>📧</span>
          {props.item.comments.count}
        </span>
        <span className='post__reposts'>
          <span className='icon'>🖅</span>
          {props.item.reposts.count}
        </span>
        <span className='post__views'>
          <span className='icon'>👁</span>
          {props.item.views.count}
        </span>
      </div>
    </div>
  )
}

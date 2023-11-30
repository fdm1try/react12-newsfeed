import React from 'react'
import { AttachmentPhoto } from '../AttachmentPhoto'
import { IAttachmentLink } from '../AttachmentLink'

export const PosterView: React.FC<IAttachmentLink> = (props) => {
  const { photo, title, url, caption } = props.item;
  return (
    <div className='attachment attachment-link-poster'>
      {photo && <AttachmentPhoto item={photo} /> }
      <div className='attachment__footer'>
        <h4 className='attachment__title'>
          <a className='attachment__title_link' href={url} target='_blank'>{title}</a>
        </h4>
        <span className='attachment__caption'>
          {caption || new URL(url).hostname}
        </span>
      </div>
    </div>
  )
}

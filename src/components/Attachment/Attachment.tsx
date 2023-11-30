import './Attachment.css';
import React from 'react'
import { TAttachmentLink, AttachmentLink } from './AttachmentLink'
import { TAttachmentPhoto, AttachmentPhoto } from './AttachmentPhoto'


export type TAttachment = {
  type: string;
  photo?: TAttachmentPhoto;
  link?: TAttachmentLink;
}

export interface IAttachment {
  item: TAttachment;
}

export const Attachment: React.FC<IAttachment> = (props) => {
  if (props.item.type === 'link' && props.item.link)
    return <AttachmentLink item={props.item.link as TAttachmentLink} />
  if (props.item.type === 'photo' && props.item.photo)
    return <AttachmentPhoto item={props.item.photo} />
  return (
    <div className='attachment attachment-unsupported'>
      Это вложение не может быть отображено.
    </div>
  );
}

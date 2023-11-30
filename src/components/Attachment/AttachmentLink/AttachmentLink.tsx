import React from 'react'
import { TAttachmentPhoto } from '../AttachmentPhoto'
import { InlineView } from './InlineView'
import { PosterView } from './PosterView';


export type TAttachmentLink = {
  url: string;
  title: string;
  caption: string;
  description: string;
  photo?: TAttachmentPhoto;
}

export interface IAttachmentLink {
  item: TAttachmentLink
}


export const AttachmentLink: React.FC<IAttachmentLink> = (props) => {
  let view = 'inline';
  if (props.item.photo) view = 'poster';
  if (props.item.photo?.button) view = 'widget';

  switch (view) {
    case 'poster':
      return <PosterView item={props.item} />;
    default:
      return <InlineView item={props.item} />;
  }  
}

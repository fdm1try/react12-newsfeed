import { IAttachmentLink } from './AttachmentLink';

export const InlineView: React.FC<IAttachmentLink> = (props) => {
  const { url, title, caption } = props.item;
  return (
    <div className='attachment attachment-link-inline'>
      <h4 className='attachment__title'>
        <a className='attachment__title_link' href={url}>{title}</a>
      </h4>
      <span className='attachment__caption'>
        {caption || new URL(url).hostname}
      </span>
    </div>
  )
}

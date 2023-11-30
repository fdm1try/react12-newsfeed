/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useMediaLoader } from '../../hooks';
import { Loader } from '../Loader';

export type TAttachmentPhoto = {
  id: string;
  sizes: Array<TAttachmentPhotoSize>;
  text?: string;
  button?: TPhotoButton;
}

export type TPhotoButton = {
  title: string;
  action: {
    type: string;
    url: string;
  }
}

export type TAttachmentPhotoSize = {
  type: string;
  url: string;
  width: number;
  height: number;
}

export interface IPhoto {
  item: TAttachmentPhoto;
  alt?: string;
  size?: string;
  title?: string;
}

export const AttachmentPhoto: React.FC<IPhoto> = (props) => {
  const caption = props.item.text || props.alt || '';
  const [urlList, setUrlList] = useState<Array<string>>([]);
  const { url, loading } = useMediaLoader(urlList);

  useEffect(() => {
    const sizes = [...props.item.sizes];
    sizes.sort((a, b) => (b.width * b.height) - (a.width * a.height));
    setUrlList(sizes.map((size) => size.url));
  }, [props.item]);

  return (
    <div className='attachment-photo'>
      { loading && <Loader /> }
      { !loading && !url && 'Изображение недоступно' }
      { !loading && url && <img className='attachment-photo__image' src={url} alt={caption} /> }
    </div>
  )
}

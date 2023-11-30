/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useState, useEffect } from 'react'
import { textSlicer, regexpPatterns } from '../../utils';
import he from 'he';

export interface IPostContent {
  text: string;
  maxLength?: number;
  onOverflowStateChanged?: (state: boolean) => void;
}

type TSlice = {
  cursor: number;
  value: string|ReactNode;
  length: number;
}

export const PostContent: React.FC<IPostContent> = (props) => {
  const [textOverflow, setTextOverflow] = useState<boolean>(false);
  const [slices, setSlices] = useState<Array<TSlice>>([]);
  const [content, setContent] = useState<ReactNode>([]);

  const handleTextPropChange = () => {
    const text = props.text.replace(/&#\d+?;/g, (str) => he.decode(str));
    const newSlices: Array<TSlice> = [];
    let cursor = 0;
    for (const [str, url] of textSlicer(text, regexpPatterns.RE_URL)) {
      if (str.length) {
        const { length } = str;
        newSlices.push({cursor, length, value: str});
        cursor += length;
      }
      if (url) {
        const value = <a href={url} target="_blank" className='post__content_url'>[ссылка]</a>;
        const length = 8;
        newSlices.push({cursor, length, value});
        cursor += length;
      }
    }
    setSlices(newSlices);
  }

  const handleSlicesChange = () => {
    let selectedSlices = slices;
    if (props.maxLength) {
      const { maxLength } = props;
      const index = slices.findIndex((slice) => slice.cursor + slice.length > maxLength);
      if (index >= 0) {
        selectedSlices = slices.slice(0, index);
        const { cursor, value } = slices[index];
        if (typeof value === 'string') {
          const newValue = value.substring(0, maxLength - cursor);
          selectedSlices.push({cursor, value: newValue, length: newValue.length })
        }
        setTextOverflow(true);
      } else {
        setTextOverflow(false);
      }
    } else {
      setTextOverflow(false);
    }
    const trimNode = (node: ReactNode) => typeof node === 'string' ? node.replace(/\s+$/, '') : node;
    const newContent = selectedSlices.map(({value}) => value)
      .reduce((result, node) => <>{result}{trimNode(node)}</>, <></>);
    setContent(newContent);
  }

  const handleOverflowStateChange = () => {
    props.onOverflowStateChanged && props.onOverflowStateChanged(textOverflow);
  }

  useEffect(handleTextPropChange, [props.text]);
  useEffect(handleSlicesChange, [slices, props.maxLength]);
  useEffect(handleOverflowStateChange, [textOverflow]);

  return (
    <p className='post__content'>
      {content}{textOverflow && '...'}
    </p>
  )
}

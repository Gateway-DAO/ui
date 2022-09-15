import dynamic from 'next/dynamic';
import { useEffect, useState, useRef, MutableRefObject } from 'react';

import { Theme, EmojiStyle } from 'emoji-picker-react';

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Box } from '@mui/material';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

type Props = {
  onchange: any;
  emojiStyle?: EmojiStyle;
};

export function EmojiPicker(props: Props) {
  const [boxEmoji, setBoxEmoji] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const wrapperRef = useRef(null);

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    props.onchange(emojiObject.emoji);
    setBoxEmoji(false);
  };

  const useOutsideAlerter = (ref: MutableRefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setBoxEmoji(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(wrapperRef);

  return (
    <Box
      ref={wrapperRef}
      style={{ position: 'absolute', top: '142px', left: '10px', zIndex: '1' }}
    >
      <EmojiEmotionsIcon
        style={{ color: '#9B96A0', cursor: 'pointer' }}
        onClick={() => {
          boxEmoji ? setBoxEmoji(false) : setBoxEmoji(true);
        }}
      />
      {boxEmoji && (
        <Picker
          onEmojiClick={onEmojiClick}
          theme={Theme.DARK}
          emojiStyle={props.emojiStyle}
        />
      )}
    </Box>
  );
}

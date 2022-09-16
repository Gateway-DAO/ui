import dynamic from 'next/dynamic';
import { useEffect, useState, useRef, MutableRefObject } from 'react';

import { Theme, EmojiStyle } from 'emoji-picker-react';

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Box, SxProps } from '@mui/material';
import { Theme as ThemeSX } from '@mui/material/styles/createTheme';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

type Props = {
  onchange: any;
  emojiStyle?: EmojiStyle;
  boxSxProps: SxProps<ThemeSX>;
  pickerSxProps: SxProps<ThemeSX>;
  iconColor: string;
};

export function EmojiPicker(props: Props) {
  const [boxEmojiIsVisible, setBoxEmojiIsVisible] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const wrapperRef = useRef(null);

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    props.onchange(emojiObject.emoji);
    setBoxEmojiIsVisible(false);
  };

  const useOutsideAlerter = (ref: MutableRefObject<HTMLDivElement>) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setBoxEmojiIsVisible(false);
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
    <Box ref={wrapperRef} sx={props.boxSxProps}>
      <EmojiEmotionsIcon
        style={{ color: props.iconColor, cursor: 'pointer' }}
        onClick={() => {
          boxEmojiIsVisible ? setBoxEmojiIsVisible(false) : setBoxEmojiIsVisible(true);
        }}
      />
      {boxEmojiIsVisible && (
        <Box sx={props.pickerSxProps}>
          <Picker
            onEmojiClick={onEmojiClick}
            theme={Theme.DARK}
            emojiStyle={props.emojiStyle}
          />
        </Box>
      )}
    </Box>
  );
}

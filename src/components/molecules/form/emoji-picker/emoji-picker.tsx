import dynamic from 'next/dynamic';
import {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react';

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

export type EmojiPickerProps = {
  onEmoji: Dispatch<SetStateAction<string>>;
  emojiStyle?: EmojiStyle;
  boxSxProps: SxProps<ThemeSX>;
  pickerSxProps: SxProps<ThemeSX>;
  iconColor: string;
};

export function EmojiPicker(props: EmojiPickerProps) {
  const [boxEmojiIsVisible, setBoxEmojiIsVisible] = useState(false);
  const wrapperRef = useRef(null);

  const onEmojiClick = (emojiObject: { emoji: SetStateAction<string> }) => {
    props.onEmoji(emojiObject.emoji);
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
          boxEmojiIsVisible
            ? setBoxEmojiIsVisible(false)
            : setBoxEmojiIsVisible(true);
        }}
      />
      {boxEmojiIsVisible && (
        <Box sx={props.pickerSxProps} onClick={(e) => e.preventDefault()}>
          <Picker
            onEmojiClick={onEmojiClick}
            theme={Theme.DARK}
            emojiStyle={props.emojiStyle}
            lazyLoadEmojis={true}
          />
        </Box>
      )}
    </Box>
  );
}
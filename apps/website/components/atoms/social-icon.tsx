import { useMemo } from 'react';

import { AiOutlineTwitter } from 'react-icons/ai';
import { FaTwitch, FaDiscord } from 'react-icons/fa';

import { Language } from '@mui/icons-material';
import { SvgIcon, SvgIconProps } from '@mui/material';

type Props = {
  icon: string;
} & SvgIconProps;

export function SocialIcon({ icon, ...other }: Props) {
  const iconComponent = useMemo(() => {
    switch (icon) {
      case 'twitter':
        return AiOutlineTwitter;
      case 'twitch':
        return FaTwitch;
      case 'discord':
        return FaDiscord;
      default:
        return Language;
    }
  }, [icon]);
  const viewBox = useMemo(() => iconComponent({}).props.attr.viewBox, []);

  return <SvgIcon component={iconComponent} viewBox={viewBox} {...other} />;
}

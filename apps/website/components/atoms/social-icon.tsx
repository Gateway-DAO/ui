import { useMemo } from 'react';

import { AiOutlineTwitter } from 'react-icons/ai';
import {
  FaTwitch,
  FaDiscord,
  FaGithub,
  FaMedium,
  FaTelegram,
  FaReddit,
} from 'react-icons/fa';

import { Language, Link, Mail } from '@mui/icons-material';
import { SvgIcon, SvgIconProps } from '@mui/material';

import { Network } from '../../constants/dao';

type Props = {
  icon: Network;
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
      case 'email':
        return Mail;
      case 'github':
        return FaGithub;
      case 'reddit':
        return FaReddit;
      case 'medium':
        return FaMedium;
      case 'telegram':
        return FaTelegram;
      case 'website':
        return Language;
      default:
        return Link;
    }
  }, [icon]);
  const viewBox = useMemo(() => {
    if (typeof iconComponent === 'function') {
      return iconComponent({}).props.attr.viewBox;
    }
    return undefined;
  }, [iconComponent]);

  return <SvgIcon component={iconComponent} viewBox={viewBox} {...other} />;
}

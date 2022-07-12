import { useMemo } from 'react';

import { AiOutlineTwitter } from 'react-icons/ai';
import { FaTwitch, FaDiscord } from 'react-icons/fa';

import { Language, Link } from '@mui/icons-material';
import { SvgIcon, SvgIconProps } from '@mui/material';

import { Network } from '../../constants/networks';

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
      case 'website':
        return Language;
      default:
        return Link;
    }
  }, [icon]);
  const viewBox = useMemo(
    () => iconComponent({}).props.attr.viewBox,
    [iconComponent]
  );

  return <SvgIcon component={iconComponent} viewBox={viewBox} {...other} />;
}

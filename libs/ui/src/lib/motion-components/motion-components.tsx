import { ComponentProps } from 'react';

import { motion } from 'framer-motion';

import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Tooltip from '@mui/material/Tooltip';

export const MotionAvatar = motion(Avatar);
export type MotionAvatarProps = ComponentProps<typeof MotionAvatar>;

export const MotionListItem = motion(ListItem);
export type MotionListItemProps = ComponentProps<typeof MotionListItem>;
export const MotionListItemButton = motion(ListItemButton);
export type MotionListItemButtonProps = ComponentProps<
  typeof MotionListItemButton
>;
export const MotionTooltip = motion(Tooltip);
export type MotionTooltipProps = ComponentProps<typeof MotionTooltip>;

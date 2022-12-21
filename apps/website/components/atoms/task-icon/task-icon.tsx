import { useMemo } from 'react';

import { SvgIconComponent } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import GitHubIcon from '@mui/icons-material/GitHub';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import QuizIcon from '@mui/icons-material/Quiz';
import Twitter from '@mui/icons-material/Twitter';
import KeyIcon from '@mui/icons-material/Key';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';

import { TaskType } from '../../../types/tasks';

const iconBgColor: Record<TaskType, string> = {
  self_verify: '#9A53FF',
  quiz: '#9A53FF',
  token_hold: '#9A53FF',
  nft_hold: '#9A53FF',
  meeting_code: '#9A53FF',
  twitter_follow: '#0094FF',
  twitter_retweet: '#0094FF',
  twitter_tweet: '#0094FF',
  github_contribute: '#4A4F57',
  github_prs: '#4A4F57',
  snapshot: '#F3B04E',
  manual: '#9A53FF',
  recaptcha: '#9A53FF',
};
const typeIcons: Record<TaskType, SvgIconComponent> = {
  self_verify: InsertLinkIcon,
  quiz: QuizIcon,
  token_hold: MonetizationOnIcon,
  nft_hold: PhotoCameraBackIcon,
  meeting_code: NumbersIcon,
  twitter_follow: Twitter,
  twitter_retweet: Twitter,
  twitter_tweet: Twitter,
  github_contribute: GitHubIcon,
  github_prs: GitHubIcon,
  snapshot: ElectricBoltIcon,
  manual: CheckCircleIcon,
  recaptcha: KeyIcon,
};

export function TaskIcon({ type, sx }: { type: TaskType; sx?: SxProps }) {
  const iconComponent = useMemo(() => {
    return typeIcons[type] || null;
  }, [type]);

  return (
    <Box
      display="flex"
      component="span"
      bgcolor={iconBgColor[type] ?? '#9A53FF'}
      padding={1.5}
      borderRadius={1}
      color={'#ffffff'}
      alignContent={'center'}
      sx={{ ...sx }}
    >
      <SvgIcon component={iconComponent} />
    </Box>
  );
}

import { PhotoCameraBack } from '@mui/icons-material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import GitHubIcon from '@mui/icons-material/GitHub';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NumbersIcon from '@mui/icons-material/Numbers';
import QuizIcon from '@mui/icons-material/Quiz';
import StarIcon from '@mui/icons-material/Star';
import Twitter from '@mui/icons-material/Twitter';
import Box from '@mui/material/Box';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { useMemo } from 'react';
import { SxProps } from '@mui/material';
import { TaskType } from '../../../types/tasks';

export function TaskIcon({ type, sx }: { type: TaskType; sx?: SxProps }) {
  const iconBgColor =
    {
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
    } ?? '#9A53FF';

  const iconComponent = useMemo(() => {
    const types = {
      self_verify: InsertLinkIcon,
      quiz: QuizIcon,
      token_hold: MonetizationOnIcon,
      nft_hold: PhotoCameraBack,
      meeting_code: NumbersIcon,
      twitter_follow: Twitter,
      twitter_retweet: Twitter,
      twitter_tweet: Twitter,
      github_contribute: GitHubIcon,
      github_prs: GitHubIcon,
      snapshot: ElectricBoltIcon,
    };

    return types[type] || null;
  }, [type]);

  return (
    <Box
      display="flex"
      component="span"
      bgcolor={iconBgColor[type]}
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

import Link from 'next/link';

import { AiFillGithub } from 'react-icons/ai';
import { BiGitRepoForked } from 'react-icons/bi';

import { BookOutlined } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Chip, Stack, Typography } from '@mui/material';

const GithubDataCard = () => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <Stack
      sx={{ color: 'black', backgroundColor: 'white', borderRadius: '10px' }}
    >
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="baseline"
        sx={{ padding: '2rem' }}
      >
        <Stack flexDirection="row" gap={2}>
          <BookOutlined fontSize="medium" />
          <Link passHref href="">
            <Typography
              color="blue"
              fontSize={20}
              fontWeight="bold"
              sx={{ cursor: 'pointer' }}
            >
              go-ethereum
            </Typography>
          </Link>
          <Chip
            label="Public"
            variant="outlined"
            sx={{ color: 'black', fontWeight: 'bold' }}
          />
        </Stack>
        <AiFillGithub fontSize="2rem" />
      </Stack>
      <Stack sx={{ padding: '0 2rem' }}>
        <Typography>
          Official Go implementation of the Ethereum protocol.
        </Typography>
      </Stack>
      <Stack
        flexDirection="row"
        alignItems="center"
        gap={2}
        sx={{ padding: '2rem' }}
      >
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <CircleIcon
            fontSize="small"
            // Random color
            sx={{ color: randomColor }}
          />
          <Typography>Go</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <StarBorderOutlinedIcon fontSize="small" />
          <Typography>39.1k</Typography>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <BiGitRepoForked />
          <Typography>14.8k</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default GithubDataCard;

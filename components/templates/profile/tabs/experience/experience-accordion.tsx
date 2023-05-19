import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';

import { theme, TOKENS } from '@/theme';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stack, Typography, Divider, Box, Avatar } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { AvatarFile } from '../../../../../components/atoms/avatar-file';
import { Experiences } from '../../../../../services/hasura/types';
import { MintCard } from '../../../../molecules/mint-card';

type Props = {
  experience: PartialDeep<Experiences>;
  index: number;
};

export function ExperienceAccordion({ experience, index }: Props) {
  return (
    <Accordion
      defaultExpanded={index === 0 ? true : false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: '20px',
        px: TOKENS.CONTAINER_PX,
        '&.MuiAccordion-root:before': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{ color: 'rgba(255, 255, 255, 0.56)' }}
          ></ExpandMoreIcon>
        }
        sx={{
          padding: '0!important',
          [`& .MuiAccordionSummary-content`]: {
            justifyContent: 'space-between',
            zIndex: '123',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '16px',
          }}
        >
          <AvatarFile
            file={experience.dao.logo}
            fallback={experience.dao.logo_url}
          ></AvatarFile>
          <Box>
            <Typography
              sx={{
                fontWeight: '600',
                fontSize: '16px',
                color: '#fff',
              }}
            >
              {experience.dao.name}
            </Typography>
            <Typography
              sx={{
                letterSpacing: '0.4px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {DateTime.fromISO(experience.start_date).toFormat('MMM yyyy')} -{' '}
              {experience.working
                ? 'Present'
                : DateTime.fromISO(experience.end_date).toFormat('MMM yyyy')}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '16px',
            marginRight: '26px',
          }}
        >
          <Typography sx={{ color: '#9A53FF' }}>
            {experience.credentials.length} credential(s)
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: '0!important',
          paddingTop: '30px!important',
        }}
      >
        {/*/////////    Dropdown   /////////*/}
        <Stack marginBottom="48px" gap={4}>
          <Typography
            sx={{
              letterSpacing: '0.15px',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            {experience.description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: '16px',
              flexWrap: 'wrap',
            }}
          >
            {experience.credentials.map((credential) => (
              <MintCard
                key={credential.id}
                credential={credential}
                sx={{
                  marginTop: theme.spacing(2),
                }}
              />
            ))}
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

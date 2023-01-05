import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { brandColors } from '@gateway/theme';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  alpha,
  Divider,
} from '@mui/material';

import { MockActivity } from '../credential-view';

type Props = {
  activities: MockActivity[];
};

export default function Activities({ activities }: Props) {
  const { t } = useTranslation('protocol');
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange =
    () => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded);
    };

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleChange()}
        sx={{
          ':before': { display: 'none' },
          m: '0!important',
        }}
      >
        <AccordionSummary
          sx={{
            p: 0,
            m: 0,
            position: 'relative',
            '& > *': {
              p: 0,
              m: '0!important',
              minHeight: '64px',
            },
          }}
        >
          <Stack direction="row" alignItems="center">
            <Typography
              fontSize={12}
              sx={{
                flexGrow: 0,
                mr: 1,
                textTransform: 'uppercase',
                fontWeight: 700,
                color: brandColors.purple.main,
              }}
            >
              {expanded
                ? t('credential.hide-activity')
                : t('credential.show-activity')}
            </Typography>
            <ArrowDropDownIcon
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'none',
                color: brandColors.purple.main,
                transition: 'all .3s ease',
              }}
            />
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, m: 0 }}>
          <Stack sx={{ mb: 2 }} gap={1} divider={<Divider />}>
            {activities?.map((activity, index) => (
              <Stack key={index}>
                <Typography fontSize={14}>{activity.name}</Typography>
                <Typography
                  fontSize={12}
                  sx={{ color: alpha(brandColors.white.main, 0.7) }}
                >
                  {activity.description}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

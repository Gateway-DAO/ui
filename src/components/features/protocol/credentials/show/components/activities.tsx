import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Activity } from '@/services/gateway-protocol/types';
import { brandColors } from '@/theme';
import { timestampToString } from '@/utils/date';
import { getExplorer } from '@/utils/web3';
import { PartialDeep } from 'type-fest/source/partial-deep';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  alpha,
  Divider,
} from '@mui/material';

type Props = {
  activities: PartialDeep<Activity>[];
};

const activityText = (type: string) => {
  return (
    {
      Issued: 'Credential issued',
      Revoked: 'Credential revoked',
      Suspended: 'Credential suspended',
      Reactivated: 'Credential reactivated',
      Updated: 'Credential updated',
    }[type] || 'Unknown activity'
  );
};

export default function Activities({ activities }: Props) {
  const { t, lang } = useTranslation('protocol');
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange =
    () => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded);
    };

  return (
    <>
      {activities?.length > 0 && (
        <Stack sx={{ mt: '-24px' }}>
          <Accordion
            id="credential-button-activity"
            expanded={expanded}
            onChange={handleChange()}
            sx={{
              ':before': { display: 'none' },
              m: '0!important',
              background: 'transparent!important',
            }}
          >
            <AccordionSummary
              sx={{
                p: 0,
                m: 0,
                mb: 1,
                position: 'relative',
                minHeight: '30px!important',
                '& > *': {
                  p: 0,
                  m: '0!important',
                  minHeight: '30px!important',
                },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: '100%' }}
              >
                <Stack direction="row" alignItems="center" flexGrow={1}>
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
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, m: 0 }}>
              <Stack sx={{ mb: 2 }} gap={1} divider={<Divider />}>
                {activities
                  ?.sort(
                    (a, b) =>
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                  )
                  .map((activity, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack>
                        <Typography fontSize={14}>
                          {activityText(activity?.type)}
                        </Typography>
                        <Typography
                          fontSize={12}
                          sx={{ color: alpha(brandColors.white.main, 0.7) }}
                        >
                          {timestampToString(
                            activity?.timestamp,
                            lang,
                            t('credential.indeterminate')
                          )}
                        </Typography>
                      </Stack>
                      <a
                        href={`${getExplorer(
                          process.env.NEXT_PUBLIC_PROTOCOL_ENV === 'production'
                            ? 137
                            : 80001
                        )}/tx/${activity?.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <OpenInNewIcon
                          sx={{
                            color: alpha(brandColors.white.main, 0.56),
                          }}
                          fontSize="small"
                        />
                      </a>
                    </Stack>
                  ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
    </>
  );
}

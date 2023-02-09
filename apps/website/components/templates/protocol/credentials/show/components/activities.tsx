import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { PartialDeep } from 'type-fest';

import { timestampToString } from '@gateway/helpers';
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

import { ROUTES } from '../../../../../../constants/routes';
import { Credential } from '../../../../../../services/gateway-protocol/types';
import ExternalLink from '../../../../../atoms/external-link';
import InternalLink from '../../../../../atoms/internal-link';

type Props = {
  credential: PartialDeep<Credential>;
};

const activityText = (type: string) => {
  return (
    {
      Issued: 'Credential issued',
      Revoked: 'Credential revoked',
      Suspended: 'Credential suspended',
      Reactivated: 'Credential reactivated',
    }[type] || 'Unknown activity'
  );
};

export default function Activities({ credential }: Props) {
  const { t, lang } = useTranslation('protocol');
  const [expanded, setExpanded] = useState<boolean>(false);
  const router = useRouter();

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
            <InternalLink
              text={t('credential.data-model-id')}
              url={ROUTES.PROTOCOL_DATAMODEL.replace(
                '[id]',
                credential?.dataModel?.id
              )}
            />
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0, m: 0 }}>
          <Stack sx={{ mb: 2 }} gap={1} divider={<Divider />}>
            {credential.activities
              ?.sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime()
              )
              .map((activity, index) => (
                <Stack key={index}>
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
              ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

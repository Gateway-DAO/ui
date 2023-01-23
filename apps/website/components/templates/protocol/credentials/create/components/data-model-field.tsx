import { useState } from 'react';

import { useToggle } from 'react-use';

import { brandColors } from '@gateway/theme';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Stack,
  Typography,
  alpha,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from '@mui/material';

import ChipInputType from '../../../components/chip-input-type';

type Props = {
  type: string;
  label: string;
  caption?: string;
};

export default function DataModelField({ type, label, caption }: Props) {
  const [expanded, setExpanded] = useToggle(true);

  return (
    <Stack
      sx={{
        borderRadius: 2,
        background:
          'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.15) 100%), #10041C',
        border: '1px solid rgba(229, 229, 229, 0.12)',
        p: 3,
      }}
    >
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded()}
        sx={{
          ':before': { display: 'none' },
          m: '0!important',
          backgroundColor: 'transparent',
        }}
      >
        <AccordionSummary
          sx={{
            p: 0,
            m: 0,
            position: 'relative',
            minHeight: '30px!important',
            '& > *': {
              p: 0,
              m: '0!important',
              minHeight: '20px!important',
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            sx={{ width: '100%' }}
          >
            <Stack sx={{ flexGrow: 1 }}>
              <Typography fontWeight={600}>{label}</Typography>
              {caption && (
                <Typography
                  fontSize={12}
                  sx={{ color: alpha(brandColors.white.main, 0.7) }}
                >
                  {caption}
                </Typography>
              )}
            </Stack>
            <ChipInputType type={type} />
            <KeyboardArrowDownIcon
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'none',
                color: alpha(brandColors.white.main, 0.56),
                transition: 'all .3s ease',
              }}
            />
          </Stack>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 3, pb: 0, px: 0, m: 0 }}>
          <TextField
            type={type}
            InputProps={{
              disableUnderline: true,
              sx: {
                '&.Mui-focused': {
                  borderBottom: '2px solid #9A53FF',
                },
                width: '100%',
              },
            }}
            sx={{ width: '100%' }}
            label={label}
            id="data-model-field"
          />
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

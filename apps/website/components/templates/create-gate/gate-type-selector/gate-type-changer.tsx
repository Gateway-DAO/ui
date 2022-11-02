import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material';

import { CreateGateData, type GateType } from '../schema';
import { useCreateGateData } from './gate-type';
import { ModalConfirmCleanup } from './modal-confirm-cleanup';

export function GateTypeChanger({ type }: { type: GateType }) {
  const { typesContent } = useCreateGateData();
  const { description, icon: Icon, title } = typesContent[type];
  const [isModalOpen, setModalOpen] = useState(false);
  const { getValues, setValue } = useFormContext<CreateGateData>();
  const { t } = useTranslation('gate-new');

  const onClick = () => {
    let hasContent = false;

    switch (type) {
      case 'task_based':
        hasContent = getValues('tasks')?.data?.length > 0;
        break;
      case 'direct':
        hasContent = getValues('whitelisted_wallets')?.length > 0;
        break;
      default:
        break;
    }

    if (hasContent) {
      setModalOpen(true);
    } else {
      setValue('type', undefined);
    }
  };

  const onConfirm = () => {
    setValue('type', undefined);
    setValue('tasks', undefined);
    setValue('whitelisted_wallets', undefined);
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Paper
        sx={{
          display: 'grid',
          gap: { xs: 2, lg: 6 },
          gridTemplateColumns: { xs: '1fr 1fr', lg: 'auto 2fr .5fr' },
          alignItems: 'center',
          justifyContent: 'flex-start',
          textAlign: 'left',
          border: '1px solid',
          px: { xs: 2, lg: 6 },
          py: { xs: 2.5, lg: 6 },
          borderColor: 'divider',
        }}
        key={type}
      >
        <Avatar sx={{ backgroundColor: 'rgba(154, 83, 255, 0.08)', order: 0 }}>
          <Icon color="primary" />
        </Avatar>
        <Box
          sx={{
            order: { xs: 2, lg: 1 },
            gridColumn: { xs: '1 / 3', lg: 'auto' },
          }}
        >
          <Typography variant="h6" color="primary">
            {title}
          </Typography>
          <Typography variant="caption">{description}</Typography>
        </Box>
        <Button
          type="button"
          onClick={onClick}
          variant="text"
          sx={{
            order: { xs: 1, lg: 2 },
            justifySelf: 'flex-end',
            alignSelf: 'center',
            width: { xs: 'fit-content', lg: 'auto' },
          }}
        >
          {t('common:actions.change')}
        </Button>
      </Paper>
      {isModalOpen && (
        <ModalConfirmCleanup onClose={onClose} onConfirm={onConfirm} />
      )}
    </>
  );
}

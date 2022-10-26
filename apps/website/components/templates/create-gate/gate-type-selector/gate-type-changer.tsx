import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material';

import { CreateGateTypes, type GateType } from '../schema';
import { useGateTypes } from './gate-type';
import { ModalConfirmCleanup } from './modal-confirm-cleanup';

export function GateTypeChanger({ type }: { type: GateType }) {
  const { typesContent } = useGateTypes();
  const { description, icon: Icon, title } = typesContent[type];
  const [isModalOpen, setModalOpen] = useState(false);
  const methods = useFormContext<CreateGateTypes>();
  const { t } = useTranslation('gate-new');

  const onClick = () => {
    const hasContent =
      type === 'task_based'
        ? methods.getValues('tasks')?.data?.length > 0
        : false;
    if (hasContent) {
      setModalOpen(true);
    } else {
      methods.setValue('type', undefined);
    }
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Paper
        sx={{
          justifyContent: 'flex-start',
          textAlign: 'left',
          border: '1px solid',
          px: { xs: 2, md: 6 },
          py: { xs: 2.5, md: 6 },
          borderColor: 'divider',
        }}
        key={type}
      >
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Stack direction="row" alignItems="center" gap={2}>
            <Avatar sx={{ backgroundColor: 'rgba(154, 83, 255, 0.08)' }}>
              <Icon color="primary" />
            </Avatar>
            <Box>
              <Typography variant="h6" color="primary">
                {title}
              </Typography>
              <Typography variant="caption">{description}</Typography>
            </Box>
          </Stack>
          <Button type="button" onClick={onClick} variant="text">
            {t('common:actions.change')}
          </Button>
        </Stack>
      </Paper>
      {isModalOpen && <ModalConfirmCleanup onClose={onClose} />}
    </>
  );
}

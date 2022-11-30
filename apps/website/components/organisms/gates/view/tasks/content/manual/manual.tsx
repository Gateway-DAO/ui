import useTranslation from 'next-translate/useTranslation';

import { Divider, Stack, TextField, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../atoms/loading-button';
import DocumentCard from './components/document-card';
import TaskInteration, { InterationType } from './components/task-interation';

const ManualContent = ({
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { t } = useTranslation('gate-profile');
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

  return (
    <Stack marginTop={4} alignItems="start">
      {!readOnly && (
        <>
          <Stack sx={{ width: '100%', mb: 5 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              {!completed && (
                <>
                  <TextField
                    required
                    label="Submit the link address"
                    id="submit-link-address"
                    sx={{ flexGrow: 1 }}
                  />
                  <LoadingButton
                    size="large"
                    variant="contained"
                    onClick={() => completeTask({ manual: true })}
                    isLoading={isLoading}
                  >
                    {t('tasks.check_action')}
                  </LoadingButton>
                </>
              )}
            </Stack>
            <DocumentCard
              docTitle="Lorem ipsum"
              docUrl="https://www.site.com/"
              docText="Dolor sit amet propectus"
            ></DocumentCard>
          </Stack>
          <Divider sx={{ width: '100%', mb: 5 }} />
          <Stack sx={{ width: '100%' }}>
            <TaskInteration
              type={InterationType.APPROVED}
              datetime="2022-11-09T19:23:00.000-00:00"
              user="hst"
            />
            <TaskInteration
              type={InterationType.DENIED}
              datetime="2022-11-09T19:23:00.000-00:00"
              user="hst"
            />
            <TaskInteration
              type={InterationType.WAITING}
              datetime="2022-11-09T19:23:00.000-00:00"
              user="hst"
            />
            <TaskInteration
              type={InterationType.LINK}
              datetime="2022-11-09T19:23:00.000-00:00"
              user="kbooz"
            />
            <TaskInteration
              type={InterationType.COMMENT}
              datetime="2022-11-09T19:23:00.000-00:00"
              user="hst"
            />
            <TaskInteration
              type={InterationType.LINK}
              datetime="2022-11-09T19:23:00.000-00:00"
              user="kbooz"
            />
            <TaskInteration
              type={InterationType.COMMENT}
              datetime="2022-11-09T19:23:00.000-00:00"
              user="hst"
            />
            <TaskInteration
              type={InterationType.LINK}
              datetime="2022-11-09T19:23:00.000-00:00"
              user="kbooz"
              firstItem={true}
            />
          </Stack>
        </>
      )}

      {completed && updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2" sx={{ marginTop: 1 }}>
          {t('tasks.completed')}
          {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default ManualContent;

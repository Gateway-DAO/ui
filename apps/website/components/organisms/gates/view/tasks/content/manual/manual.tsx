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
              headerText="approved the submission - 10/05/2022, 11:24 am"
              user="hst"
            />
            <TaskInteration
              type={InterationType.DENIED}
              headerText="denied the submission - 10/05/2022, 11:24 am"
              user="hst"
            />
            <TaskInteration
              type={InterationType.WAITING}
              headerText="Waiting for feedback from"
              user="hst"
            />
            <TaskInteration
              type={InterationType.LINK}
              headerText="submitted a link - 10/03/2022, 4:23 pm"
              user="kbooz"
            />
            <TaskInteration
              type={InterationType.COMMENT}
              headerText="sent a comment - 10/04/2022 11:20 am"
              user="hst"
            />
            <TaskInteration
              type={InterationType.LINK}
              headerText="submitted a link - 10/03/2022, 4:23 pm"
              user="kbooz"
            />
            <TaskInteration
              type={InterationType.COMMENT}
              headerText="sent a comment - 10/04/2022 11:20 am"
              user="hst"
            />
            <TaskInteration
              type={InterationType.LINK}
              headerText="submitted a link - 10/03/2022, 4:23 pm"
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

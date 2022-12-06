import useTranslation from 'next-translate/useTranslation';

import { Divider, Stack, TextField, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../atoms/loading-button';
import DocumentCard from './components/document-card';
import { InterationList } from './components/interation-list';
import {
  InterationType,
  TaskInterationProps,
} from './components/task-interation';

const ManualContent = ({
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { t } = useTranslation('gate-profile');
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

  // MOCK
  const interations: TaskInterationProps[] = [
    {
      username: 'kbooz',
      datetime: new Date().toISOString(),
      type: InterationType.APPROVED,
    },
    {
      username: 'kbooz',
      datetime: '2022-11-09T09:35:00.000-00:00',
      type: InterationType.DENIED,
    },
    {
      username: 'kbooz',
      datetime: '2022-11-09T05:12:00.000-00:00',
      type: InterationType.WAITING,
    },
    {
      username: 'kbooz',
      datetime: '2022-11-09T19:01:00.000-00:00',
      type: InterationType.LINK,
      docTitle: 'Title of Page',
      docUrl: 'docs.google.com',
      docText:
        "Other hits by Coolio, who won a Grammy for 'Gangsta`s Paradise' in the mid-1990s, included “Fantastic Voyage”",
    },
    {
      username: 'h.st',
      fullname: 'Harisson Santos',
      datetime: '2022-11-08T11:10:00.000-00:00',
      type: InterationType.COMMENT,
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum sodales ipsum eget molestie.',
    },
    {
      username: 'kbooz',
      datetime: '2022-11-07T19:23:00.000-00:00',
      type: InterationType.LINK,
      docTitle: 'Title of Page',
      docUrl: 'docs.google.com',
      docText:
        "Other hits by Coolio, who won a Grammy for 'Gangsta`s Paradise' in the mid-1990s, included “Fantastic Voyage”",
    },
  ];
  // MOCK - END

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
                    label={t('tasks.manual.label')}
                    id="submit-link-address"
                    sx={{ flexGrow: 1 }}
                  />
                  <LoadingButton
                    size="large"
                    variant="contained"
                    onClick={() => completeTask({ manual: true })}
                    isLoading={isLoading}
                  >
                    {t('tasks.manual.action')}
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
          <InterationList list={interations} />
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

import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import {
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../../../../../providers/auth';
import { LoadingButton } from '../../../../../../atoms/loading-button';
import { TaskProps } from '../types';
import DocumentCard from './components/document-card';
import { InterationList } from './components/interation-list';
import {
  InterationType,
  TaskInterationProps,
} from './components/task-interation';

const ManualContent = ({
  task,
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}: TaskProps) => {
  const { t } = useTranslation('gate-profile');
  const { me, gqlAuthMethods } = useAuth();
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [link, setLink] = useState<string>();
  const currentTaskProgress = me?.task_progresses?.find(
    (tp) => tp.task_id === task.id
  );

  const manualTaskEvents = useQuery(
    ['manual-task-events', currentTaskProgress?.id, me?.id],
    () =>
      gqlAuthMethods.manual_task_events({
        task_progress_id: currentTaskProgress!.id,
      }),
    {
      enabled: !!currentTaskProgress?.id,
    }
  );

  const onSubmitLink = async () => {
    await completeTask({
      event_type: 'send_link',
      data: 'https://www.google.com/',
    });
    manualTaskEvents.remove();
  };

  // MOCK
  const interations: TaskInterationProps[] = [];
  // const interations: TaskInterationProps[] = [
  //   {
  //     username: 'kbooz',
  //     datetime: new Date().toISOString(),
  //     type: InterationType.APPROVED,
  //   },
  //   {
  //     username: 'kbooz',
  //     datetime: '2022-11-09T09:35:00.000-00:00',
  //     type: InterationType.DENIED,
  //   },
  //   {
  //     username: 'kbooz',
  //     datetime: '2022-11-09T05:12:00.000-00:00',
  //     type: InterationType.WAITING,
  //   },
  //   {
  //     username: 'kbooz',
  //     datetime: '2022-11-09T19:01:00.000-00:00',
  //     type: InterationType.LINK,
  //     docTitle: 'Title of Page',
  //     docUrl: 'docs.google.com',
  //     docText:
  //       "Other hits by Coolio, who won a Grammy for 'Gangsta`s Paradise' in the mid-1990s, included “Fantastic Voyage”",
  //   },
  //   {
  //     username: 'h.st',
  //     fullname: 'Harisson Santos',
  //     datetime: '2022-11-08T11:10:00.000-00:00',
  //     type: InterationType.COMMENT,
  //     comment:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum sodales ipsum eget molestie.',
  //   },
  //   {
  //     username: 'kbooz',
  //     datetime: '2022-11-07T19:23:00.000-00:00',
  //     type: InterationType.LINK,
  //     docTitle: 'Title of Page',
  //     docUrl: 'docs.google.com',
  //     docText:
  //       "Other hits by Coolio, who won a Grammy for 'Gangsta`s Paradise' in the mid-1990s, included “Fantastic Voyage”",
  //   },
  // ];
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
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <LoadingButton
                    size="large"
                    variant="contained"
                    onClick={onSubmitLink}
                    isLoading={isLoading}
                  >
                    {t('tasks.manual.action')}
                  </LoadingButton>
                </>
              )}
            </Stack>
            {/*             <DocumentCard
              docTitle="Lorem ipsum"
              docUrl="https://www.site.com/"
              docText="Dolor sit amet propectus"
            ></DocumentCard> */}
          </Stack>
          <Divider sx={{ width: '100%', mb: 5 }} />
          {manualTaskEvents.isLoading ? (
            <CircularProgress />
          ) : (
            <InterationList
              list={manualTaskEvents.data?.manual_task_events ?? []}
            />
          )}
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

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { TabPanel } from '@/components/atoms/tabs';
import { HeadContainer } from '@/components/molecules/head-container';
import ConfirmDialog from '@/components/molecules/modal/confirm-dialog';
import ModalRight from '@/components/molecules/modal/modal-right';
import { ClientNav } from '@/components/organisms/navbar/client-nav';
import { DashboardTemplate } from '@/components/templates/dashboard';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { gqlAnonMethods } from '@/services/hasura/api';
import { Protocol_Api_PermissionType } from '@/services/hasura/types';
import { brandColors, theme, TOKENS } from '@/theme';
import { useQuery } from '@tanstack/react-query';
import { useToggle } from 'react-use';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Box,
  Stack,
  IconButton,
  useMediaQuery,
  Typography,
  Tab,
  Tabs,
  Skeleton,
  alpha,
} from '@mui/material';

import { CredentialProtocolCreate } from '../..';
import FloatingCta from '../../components/floating-cta';
import InfoTitle from '../../components/info-title';
import Tags from '../../components/tags';
import IssueCredentialButton from './components/issue-credential-button';

export function DataModelLayout({ children }) {
  const { t } = useTranslation('protocol');
  const { me } = useAuth();
  const router = useRouter();
  const { id: dataModelId } = router.query;

  const [confirmDiscardChanges, setConfirmDiscardChanges] = useState(false);
  const [openCreateCredential, setOpenCreateCredential] = useToggle(false);

  const toggleModal = () => {
    if (openCreateCredential) {
      router.back();
    } else {
      router.push('#issue-credential');
    }
    setOpenCreateCredential();
  };

  let _selectedTab = router.asPath;
  _selectedTab = _selectedTab.slice(_selectedTab.lastIndexOf('/')).slice(1);

  const routesForTabs = [
    '',
    'issuers',
    'recipients',
    'credentials',
    'playground',
  ];
  const tabs = [
    'overview',
    'issuers',
    'recipients',
    'credentials',
    'playground',
  ];

  const selectedIndex =
    routesForTabs.indexOf(_selectedTab) === -1
      ? 0
      : routesForTabs.indexOf(_selectedTab);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const { data: dataModel, isLoading } = useQuery(
    [query.dataModel, dataModelId],
    async () =>
      gqlAnonMethods.protocol_data_model({ id: dataModelId as string }),
    {
      select(data) {
        return data.protocol.dataModel;
      },
    }
  );

  const isP2PDataModel =
    dataModel?.permissioning === Protocol_Api_PermissionType.All;

  const hasAnAccountAvailableToIssue = useMemo(() => {
    if (!me?.id) return;
    const organizationsId = me?.protocol?.accesses?.map(
      (item) => item.organization.id
    );
    const usersIdAndOrganizationsId = [me?.protocol?.id].concat(
      organizationsId
    );
    const availableToIssue = dataModel?.allowedUsers
      .concat(dataModel?.allowedOrganizations as any)
      .map((availableItem) => availableItem.id);

    switch (dataModel?.permissioning) {
      case Protocol_Api_PermissionType.SpecificIds:
        return !!usersIdAndOrganizationsId.find((userOrOrgId) => {
          return (
            availableToIssue.length &&
            availableToIssue?.indexOf(userOrOrgId) > -1
          );
        });
      case Protocol_Api_PermissionType.Organizations:
        return !!organizationsId.length;
      case Protocol_Api_PermissionType.All:
      default:
        return true;
    }
  }, [me]);
  // MOCK - END

  return (
    <>
      <HeadContainer
        title={`${isLoading ? 'Loading...' : dataModel.title} Data Model`}
      />

      <DashboardTemplate
        containerProps={{
          sx: {
            overflow: '',
          },
          height: '100%',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          sx={{
            display: 'flex',
            pt: 2,
            flexGrow: {
              md: 0.5,
            },
            px: TOKENS.CONTAINER_PX,
          }}
        >
          <IconButton onClick={() => router.back()}>
            <Avatar>
              <ArrowBackIcon />
            </Avatar>
          </IconButton>
          <Box>
            <ClientNav />
          </Box>
        </Stack>
        <Stack
          sx={{
            py: 2,
            pb: { md: 1, xs: 27 },
            px: isMobile ? TOKENS.CONTAINER_PX : 0,
          }}
        >
          <Stack sx={{ px: { xs: 0, md: 4, lg: 6 } }}>
            {isP2PDataModel && (
              <>
                <Stack
                  sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexBasis: '100%',
                    borderRadius: '16px 16px 0 0',
                    transition: 'background .3s ease',
                    '&:hover': {
                      background: 'inherit',
                    },
                  }}
                >
                  <Box sx={{ mr: 2, img: { borderRadius: '16px' } }}>
                    <img
                      src={
                        dataModel?.image === null
                          ? '/logo.png'
                          : dataModel?.image
                      }
                      alt={dataModel?.title}
                      height={'100px'}
                      width={'100px'}
                    />
                  </Box>
                  <div>
                    <InfoTitle
                      title={dataModel?.title}
                      labelId={t('data-model.data-model-id')}
                      id={dataModel?.id}
                      copySucessMessage={t('data-model.copy-id')}
                      badgeTooltip={t('data-model.verified-description')}
                    />
                    <Tags tags={dataModel?.tags} />
                  </div>
                </Stack>
                <Typography sx={{ mb: 3, maxWidth: '610px' }}>
                  {dataModel?.description}
                </Typography>
              </>
            )}

            {!isP2PDataModel && (
              <>
                <InfoTitle
                  title={dataModel?.title}
                  labelId={t('data-model.data-model-id')}
                  id={dataModel?.id}
                  copySucessMessage={t('data-model.copy-id')}
                  badgeTooltip={t('data-model.verified-description')}
                  isLoading={isLoading}
                />
                <Tags tags={dataModel?.tags} />
                <Typography sx={{ mb: 3 }}>
                  {isLoading ? (
                    <Skeleton width={400} />
                  ) : (
                    dataModel?.description
                  )}
                </Typography>
                <Box>
                  <IssueCredentialButton
                    hasAnAccountAvailableToIssue={hasAnAccountAvailableToIssue}
                    onClickIssueCredential={toggleModal}
                  />
                </Box>
              </>
            )}
          </Stack>
        </Stack>
        <Box mt={4}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              px: { xs: 0, md: 4, lg: 6 },
            }}
          >
            <Tabs
              value={selectedIndex}
              onChange={(_, index) => {
                const tab = routesForTabs.at(index);
                if (tab === '') {
                  router.replace(`/model/${dataModel?.id}`, undefined, {
                    shallow: true,
                  });
                } else
                  router.replace(`/model/${dataModel?.id}/${tab}`, undefined, {
                    shallow: true,
                  });
              }}
              sx={{
                mb: '-1px',
                '& > div': {
                  maxWidth: { xs: '350px', md: '100%' },
                  overflow: { xs: 'scroll!important', md: 'hidden' },
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                },
              }}
            >
              {tabs.map((value, index) => (
                <Tab
                  key={index}
                  label={value}
                  sx={(theme) => ({
                    fontWeight: 700,
                    px: 0,
                    mr: theme.spacing(3),
                    fontSize: '12px',
                  })}
                />
              ))}
            </Tabs>
          </Box>
          <TabPanel tabsId={''} index={0} active>
            <Box mt={2}>{children}</Box>
          </TabPanel>
        </Box>
        <FloatingCta credential={{}} />
      </DashboardTemplate>
      {me?.id && (
        <>
          <ModalRight
            open={openCreateCredential}
            handleClose={() => setConfirmDiscardChanges(true)}
          >
            <Stack
              sx={{
                pt: { xs: 3, md: 6 },
                pb: { xs: 2, md: 3 },
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '100%',
              }}
            >
              <IconButton
                aria-label="close"
                sx={{ background: alpha(brandColors.white.main, 0.16) }}
                onClick={() => setConfirmDiscardChanges(true)}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
            <CredentialProtocolCreate dataModel={dataModel} />
          </ModalRight>
          <ConfirmDialog
            open={confirmDiscardChanges}
            negativeAnswer={t('data-model.issue-credential.dialog-negative')}
            positiveAnswer={t('data-model.issue-credential.dialog-positive')}
            title={t('data-model.issue-credential.dialog-title')}
            setOpen={setConfirmDiscardChanges}
            onConfirm={toggleModal}
          >
            {t('data-model.issue-credential.dialog-text')}
          </ConfirmDialog>
        </>
      )}
    </>
  );
}

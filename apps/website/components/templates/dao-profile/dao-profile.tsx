import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';

import { useQuery } from 'react-query';
import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Chip, Box, Stack, Typography, Tabs, Tab } from '@mui/material';

import { categoriesMap } from '../../../constants/dao';
import { useFile } from '../../../hooks/use-file';
import { gqlAnonMethods } from '../../../services/api';
import { Daos } from '../../../services/graphql/types.generated';
import { AvatarFile } from '../../atoms/avatar-file';
import { FollowButtonDAO } from '../../atoms/follow-button-dao';
import { a11yTabProps, TabPanel, useTab } from '../../atoms/tabs';
import { Navbar } from '../../organisms/navbar/navbar';
import { Socials } from './socials';
import { GatesTab, OverviewTab } from './tabs';
import { PeopleTab } from './tabs/people-tab';

type Props = {
  dao: PartialDeep<Daos>;
  isAdmin: boolean;
};

export function DaoProfileTemplate({ dao, isAdmin }: Props) {
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();

  const peopleQuery = useQuery(
    ['dao-people', dao.id],
    () => gqlAnonMethods.dao_profile_people({ id: dao.id }),
    { enabled: !!dao?.id }
  );

  const onResetPeopleQuery = () => {
    peopleQuery.refetch();
  };

  const followers =
    peopleQuery.data?.daos_by_pk?.followers.map(({ user }) => user) ?? [];

  const tabs = [
    {
      key: 'overview',
      label: t('common:tabs.overview'),
      section: <OverviewTab dao={dao} people={followers} setTab={setTab} />,
    },
    {
      key: 'gates',
      label: t('common:tabs.gates'),
      section: <GatesTab dao={dao} />,
    },
    {
      key: 'people',
      label: t('common:tabs.people'),
      section: <PeopleTab people={followers} />,
    },
  ];

  const cover = useFile(dao.background);

  return (
    <>
      <Box
        sx={{
          height: (theme) => theme.spacing(35),
          pt: 2,
          position: 'relative',
          ...(!cover
            ? {
                background: `url(${dao.background_url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }
            : {}),
        }}
      >
        <Navbar sx={{ zIndex: 1 }} />
        {cover?.url && cover?.blur ? (
          <Image
            src={cover.url}
            blurDataURL={cover.blur}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt={dao.name}
          />
        ) : null}
      </Box>
      <Box
        sx={{
          px: TOKENS.CONTAINER_PX,
          marginTop: -13,
        }}
      >
        <AvatarFile
          sx={{
            height: (theme) => theme.spacing(16.25),
            width: (theme) => theme.spacing(16.25),
            border: (theme) => `${theme.spacing(0.5)} solid`,
            borderColor: 'background.default',
          }}
          file={dao.logo}
          fallback={dao.logo_url}
        />
        <Box>
          <Typography component="h1" variant="h4">
            {dao.name}
          </Typography>
          {dao.categories && (
            <Stack direction="row" gap={2} sx={{ mt: 12 / 8 }}>
              {dao.categories.map((category) => {
                const label = categoriesMap.get(category) ?? category;
                return <Chip key={category} label={label} size="small" />;
              })}
            </Stack>
          )}
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              maxWidth: {
                md: 1 / 2,
              },
            }}
            color="text.secondary"
          >
            {dao.description}
          </Typography>
          <Stack
            direction="row"
            gap={1}
            divider={<span>·</span>}
            sx={{ mt: 12 / 8 }}
          >
            {peopleQuery.isSuccess && (
              <Typography variant="body1">
                {t('common:count.follower', {
                  count:
                    peopleQuery.data?.daos_by_pk?.followers_aggregate?.aggregate
                      ?.count ?? 0,
                })}
              </Typography>
            )}
            <Typography variant="body1">
              {t('common:count.gate', { count: dao.gates?.length ?? 0 })}
            </Typography>
          </Stack>
          <Socials dao={dao}>
            <FollowButtonDAO
              daoId={dao.id}
              onFollow={onResetPeopleQuery}
              onUnfollow={onResetPeopleQuery}
              disabled={isAdmin}
            />
          </Socials>
        </Box>
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          px: TOKENS.CONTAINER_PX,
          mt: 4,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          sx={{ mb: '-1px' }}
        >
          {tabs.map(({ key, label }, index) => (
            <Tab key={key} label={label} {...a11yTabProps('dao', index)} />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ key, section }, index) => (
        <TabPanel
          key={key}
          tabsId="dao"
          index={index}
          active={index === activeTab}
        >
          {section}
        </TabPanel>
      ))}
    </>
  );
}

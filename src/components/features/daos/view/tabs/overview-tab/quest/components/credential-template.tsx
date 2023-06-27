import Loading from '@/components/atoms/loadings/loading';
import { DataModelCard } from '@/components/molecules/cards/data-model-card';
import { query } from '@/constants/queries';
import { hasuraPublicService } from '@/services/hasura/api';
import { TOKENS } from '@/theme';
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import MUICard from '@mui/material/Card';
import tags from '@/components/features/protocol/components/tags';
import { CategoriesList } from '@/components/molecules/categories-list';
import ModalRight from '@/components/molecules/modal/modal-right';
import ExternalLink from '@/components/atoms/external-link';
import DashboardCard from '@/components/features/protocol/components/dashboard-card';
import OverviewCardInfo from '@/components/features/protocol/data-models/view/components/overview-card-info';
import TableSchema from '@/components/features/protocol/data-models/view/components/table-schema';
import { Protocol_Api_DataModel } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

export default function CredentialTemplate() {
  const categories = [
    { name: 'Featured', selected: true },
    { name: 'Education', selected: false },
    { name: 'Investment', selected: false },
    { name: 'Media', selected: false },
    { name: 'Social', selected: false },
    { name: 'Service', selected: false },
  ];

  const [openDetialsModal, setOpenDetialsModal] = useState(false);

  const internalPageSize = 6;
  const {
    data: dataModels,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [query.dataModels],
    async ({ pageParam }) => {
      const result = await hasuraPublicService.protocol_data_models({
        take: internalPageSize,
        skip: pageParam || 0,
      } as any);

      return result.protocol_data_model;
    },
    {
      getNextPageParam: (lastPage = [], pages) =>
        lastPage.length < internalPageSize
          ? undefined
          : pages.length * internalPageSize,
    }
  );
  const [dataModelSelected, setDataModelSelected] = useState<
    any
  >();

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.05) {
        fetching = true;
        await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Stack direction={'column'} mx={7}>
      <Box>
        <Typography variant="h5">
          Select a credential template to start
        </Typography>
        <Typography variant="body2">
          Find the template that fit you needs
        </Typography>
      </Box>
      <Stack direction="row" my={7} spacing={1}>
        {categories?.map((category, index) => {
          return (
            <Chip
              aria-hidden={false}
              key={index}
              label={category.name}
              size="small"
              sx={{ mr: 'none' }}
            />
          );
        })}
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        <Box>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(3, 1fr)',
                  },
                  gap: 2,
                }}
              >
                {dataModels &&
                  dataModels.pages.map((page) => (
                    <>
                      {page.map((model, index) => (
                        <MUICard
                          sx={{
                            position: 'relative',
                            cursor: 'pointer',
                            backgroundColor: 'rgba(154, 83, 255, 0.08)',
                            ':hover': {
                              backgroundColor: 'rgba(154, 83, 255, 0.16)',
                              img: {
                                filter: 'none',
                                mixBlendMode: 'unset',
                              },
                            },
                            border: '1px solid rgba(154, 83, 255, 0.3);',
                          }}
                        >
                          <CardActions
                            disableSpacing
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                              p: 0,
                            }}
                          >
                            <Checkbox
                              size="small"
                              color="primary"
                              
                            ></Checkbox>
                          </CardActions>
                          <CardHeader
                            sx={{
                              pb: 1,
                              '.MuiCardHeader-avatar': {
                                width: '100%',
                                mt: -2,
                                mb: -1,
                              },
                              px: 0,
                              backgroundColor: '#9A53FF',
                              img: {
                                filter: 'grayscale(1)',
                                mixBlendMode: 'hard-light',
                              },
                              ':hover': {
                                img: {
                                  filter: 'none',
                                  mixBlendMode: 'unset',
                                },
                              },
                            }}
                            avatar={
                              <img
                                width={'100%'}
                                src={
                                  'https://user-images.githubusercontent.com/63333707/234028818-2faa0548-20ed-483d-93b6-6e09d1308da9.png'
                                }
                                alt={model.title}
                                height={'auto'}
                              />
                            }
                          />

                          <CardContent sx={{ py: 1, mb: 1 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              sx={{ cursor: 'pointer', color: '#9A53FF' }}
                            >
                              {model.title}
                            </Typography>
                            <Typography
                              height={40}
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                /* TODO: make line-clamp reusable */
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                mb: 1,
                              }}
                            >
                              {model.description}
                            </Typography>
                            <Stack
                              direction={'row'}
                              justifyContent={'space-between'}
                            >
                              <Chip
                                aria-hidden={false}
                                label={model.tags[0]}
                                size="small"
                              />
                              <Button variant="outlined" onClick={() => {
                                console.log(model)
                                setDataModelSelected(model);
                                setOpenDetialsModal(true)
                              }}>View Details</Button>
                            </Stack>
                          </CardContent>
                        </MUICard>
                      ))}
                    </>
                  ))}
                {isFetchingNextPage && <Loading />}
              </Box>
            </>
          )}
        </Box>
      </Box>
      <ModalRight
        open={openDetialsModal}
        handleClose={() => setOpenDetialsModal(false)}
      >
        <>
          <OverviewCardInfo dataModel={dataModelSelected} />
          <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
            <ExternalLink
              text={'ss'}
              handleClick={() => {
                window.open(dataModelSelected?.arweaveInfo?.url);
              }}
            />
          </Stack>
          <Stack
            gap={2}
            justifyContent="space-between"
            sx={{ flexDirection: { xs: 'column', md: 'row' }, mb: 5 }}
          >
            {/* <DashboardCard
            label={t('data-model.issuers')}
            value={stats?.protocol?.getTotalofIssuersByDataModel}
            caption={`from ${
              stats?.protocol?.getTotalofIssuersByDataModel -
              statsUntilYesterday?.issuer_count?.aggregate?.count
            } (in 1 day)`}
            indicator={calculateGrowth(
              stats?.protocol?.getTotalofIssuersByDataModel,
              statsUntilYesterday?.issuer_count?.aggregate?.count
            )}
          />
          <DashboardCard
            label={t('data-model.issued-credentials')}
            value={stats?.protocol?.getTotalCredentialsByDataModel}
            caption={`from ${
              stats?.protocol?.getTotalCredentialsByDataModel -
              statsUntilYesterday?.credential_count?.aggregate?.count
            } (in 1 day)`}
            indicator={calculateGrowth(
              stats?.protocol?.getTotalCredentialsByDataModel,
              statsUntilYesterday?.credential_count?.aggregate?.count
            )}
          />
          <DashboardCard
            label={t('data-model.recipients')}
            value={
              stats?.protocol?.getTotalCredentialsByDataModelGroupByRecipient
            }
            caption={`from ${
              stats?.protocol?.getTotalCredentialsByDataModelGroupByRecipient -
              statsUntilYesterday?.recipient_count?.aggregate?.count
            } (in 1 day)`}
            indicator={calculateGrowth(
              stats?.protocol?.getTotalCredentialsByDataModelGroupByRecipient,
              statsUntilYesterday?.recipient_count?.aggregate?.count
            )}
          /> */}
          </Stack>
          <TableSchema
            title="Claim"
            data={dataModelSelected?.schema?.properties}
            subtitle1="Field"
            subtitle2="Input Type"
          />
        </>
      </ModalRight>
    </Stack>
  );
}

import Loading from '@/components/atoms/loadings/loading';
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
  IconButton,
  Radio,
  Skeleton,
  Stack,
  Typography,
  alpha,
} from '@mui/material';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Dispatch, useEffect, useRef, useState } from 'react';
import MUICard from '@mui/material/Card';

import ModalRight from '@/components/molecules/modal/modal-right';
import ExternalLink from '@/components/atoms/external-link';
import DashboardCard from '@/components/features/protocol/components/dashboard-card';
import OverviewCardInfo from '@/components/features/protocol/data-models/view/components/overview-card-info';
import TableSchema from '@/components/features/protocol/data-models/view/components/table-schema';

import InfoTitle from '@/components/features/protocol/components/info-title';
import Tags from '@/components/features/protocol/components/tags';
import { useWindowSize } from '@/hooks/use-window-size';
import CloseIcon from '@mui/icons-material/Close';
import { brandColors, theme } from '@/theme';
import { createGateSchema } from '@/components/features/gates/create/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { CreateGateSchema } from '../../direct-credential/create-direct-credential';

export default function CredentialTemplate({
  updateFormState,
  handleStep,
  input,
  fullFormState,
}: {
  updateFormState: Dispatch<any>;
  handleStep: (value: boolean) => void;
  input: any;
  fullFormState: any;
}) {
  const categories = [
    { name: 'Featured', selected: true },
    { name: 'Education', selected: false },
    { name: 'Investment', selected: false },
    { name: 'Media', selected: false },
    { name: 'Social', selected: false },
    { name: 'Service', selected: false },
  ];
  const windowSize = useWindowSize();

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

  const methods = useFormContext<CreateGateSchema>();
  const [dataModelSelected, setDataModelSelected] = useState<any>(
    fullFormState?.template?.dataModel
  );
  const containerRef = useRef(null);

  useEffect(() => {
    let fetching = false;
    const onScroll = async () => {
      const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.05) {
        fetching = true;
        await fetchNextPage();
        fetching = false;
      }
    };
    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener('scroll', onScroll);
    }
    return () => {
      if (containerElement) {
        containerElement.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  const {
    data: dataModelStats,
    refetch: refetchStats,
    isFetching: loadingStats,
  } = useQuery(
    ['data-model-stats', dataModelSelected?.id],
    async () => {
      const result = await hasuraPublicService.protocol_get_data_model_stats({
        dataModelId: dataModelSelected?.id,
      });
      return result;
    },
    {
      enabled: false,
    }
  );
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const isoYesterday = yesterday.toISOString();

  const {
    data: dataModelStatsYesterday,
    refetch: refetchStatsYesterday,
    isFetching: loadingYesterdayStats,
  } = useQuery(
    ['data-model-stats', dataModelSelected?.id],
    async () => {
      const result = await hasuraPublicService.getDMStatsUntilDayBefore({
        dataModelId: dataModelSelected?.id,
        date: isoYesterday,
      });
      return result;
    },
    {
      enabled: false,
    }
  );

  const calculateGrowth = (finalValue: number, startingNumber: number) => {
    if (startingNumber > 0)
      return parseFloat(
        ((finalValue - startingNumber) / startingNumber).toFixed(2)
      );
  };

  return (
    <>
      <Stack direction={'column'} mx={7} mb={5}>
        <Box>
          <Typography variant="h5">
            Select a credential template to start
          </Typography>
          <Typography variant="body2">
            Find the template that fit you needs
          </Typography>
        </Box>
        <Stack direction="row" my={4} spacing={1}>
          {categories?.map((category, index) => {
            return (
              <Chip
                aria-hidden={false}
                key={index}
                label={category.name}
                size="small"
                sx={{ mr: 'none' }}
                variant={category.selected ? 'filled' : 'outlined'}
                color="primary"
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
          ref={containerRef}
        >
          <Box sx={{ height: windowSize.height }}>
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
                            key={index}
                            role="radio"
                            sx={{
                              position: 'relative',
                              cursor: 'pointer',
                              backgroundColor:
                                dataModelSelected?.id === model?.id
                                  ? 'rgba(154, 83, 255, 0.16)'
                                  : 'rgba(154, 83, 255, 0.05)',
                              img: {
                                filter:
                                  dataModelSelected?.id === model?.id
                                    ? 'none'
                                    : '',
                                mixBlendMode:
                                  dataModelSelected?.id === model?.id
                                    ? 'unset'
                                    : '',
                              },

                              border: '#9A53FF',
                            }}
                          >
                            <CardActions
                              disableSpacing
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                p: 0,
                                mx: 0,
                              }}
                              onClick={() => {
                                setDataModelSelected(model);
                                handleStep(true);
                                methods.setValue('data_model_id', model.id);
                                methods.setValue('title', model.title);
                                methods.setValue(
                                  'description',
                                  model.description
                                );
                                methods.setValue('image', model.image);
                                methods.setValue('categories', model.tags);
                                methods.setValue(
                                  'creator.id',
                                  model.createdBy.gatewayId
                                );
                                methods.setValue('schema', model.schema);
                                updateFormState((prev) => ({
                                  ...prev,
                                  [input.name]: {
                                    dataModel: model,
                                  },
                                }));
                              }}
                            >
                              <Radio
                                size="small"
                                color="primary"
                                sx={{ position: 'absolute', top: 0, left: 0 }}
                                checked={dataModelSelected?.id == model.id}
                              ></Radio>
                              <CardHeader
                                sx={{
                                  width: '100%',
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
                            </CardActions>
                            <CardContent sx={{ py: 1, mb: 1 }}>
                              <Typography
                                gutterBottom
                                variant="h5"
                                sx={{ cursor: 'pointer', color: '#9A53FF' }}
                              >
                                {model.title}
                              </Typography>

                              <Stack
                                direction={'row'}
                                mt={3}
                                justifyContent={'space-between'}
                              >
                                <Chip
                                  aria-hidden={false}
                                  label={model.tags[0]}
                                  size="small"
                                  sx={{ mt: 4.9 }}
                                />
                                <Button
                                  variant="outlined"
                                  onClick={() => {
                                    setDataModelSelected(model);
                                    refetchStats();
                                    refetchStatsYesterday();
                                    setOpenDetialsModal(true);
                                  }}
                                  sx={{ mt: 4.2 }}
                                >
                                  View Details
                                </Button>
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
          <Stack
            sx={{
              pt: { xs: 3, md: 6 },
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <IconButton
              aria-label="close"
              sx={{ background: alpha(brandColors.white.main, 0.16) }}
              onClick={() => setOpenDetialsModal(false)}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack sx={{ py: TOKENS.CONTAINER_PX, mt: -8 }}>
            <InfoTitle
              title={dataModelSelected?.title}
              labelId={'label id'}
              id={dataModelSelected?.id}
              copySucessMessage={'copy sucess'}
              badgeTooltip={'copy'}
              isLoading={isLoading}
            />
            <Tags tags={dataModelSelected?.tags} />
            <Typography sx={{ mb: 3 }}>
              {isLoading ? (
                <Skeleton width={400} />
              ) : (
                dataModelSelected?.description
              )}
            </Typography>
            <OverviewCardInfo dataModel={dataModelSelected} />
            <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
              <ExternalLink
                text={'ss'}
                handleClick={() => {
                  window.open(dataModelSelected?.arweaveInfo?.url);
                }}
              />
            </Stack>
            {loadingStats && loadingYesterdayStats ? (
              <Skeleton width={400} />
            ) : (
              <Stack
                gap={2}
                justifyContent="space-between"
                sx={{ flexDirection: { xs: 'column', md: 'row' }, mb: 5 }}
              >
                <DashboardCard
                  label="data-model.issuers"
                  value={dataModelStats?.protocol?.getTotalofIssuersByDataModel}
                  caption={`from ${
                    dataModelStats?.protocol?.getTotalofIssuersByDataModel -
                    dataModelStatsYesterday?.issuer_count?.aggregate?.count
                  } (in 1 day)`}
                  indicator={calculateGrowth(
                    dataModelStats?.protocol?.getTotalofIssuersByDataModel,
                    dataModelStatsYesterday?.issuer_count?.aggregate?.count
                  )}
                />
                <DashboardCard
                  label="data-model.issued-credentials"
                  value={
                    dataModelStats?.protocol?.getTotalCredentialsByDataModel
                  }
                  caption={`from ${
                    dataModelStats?.protocol?.getTotalCredentialsByDataModel -
                    dataModelStatsYesterday?.credential_count?.aggregate?.count
                  } (in 1 day)`}
                  indicator={calculateGrowth(
                    dataModelStats?.protocol?.getTotalCredentialsByDataModel,
                    dataModelStatsYesterday?.credential_count?.aggregate?.count
                  )}
                />
                <DashboardCard
                  label="data-model.recipients"
                  value={
                    dataModelStats?.protocol
                      ?.getTotalCredentialsByDataModelGroupByRecipient
                  }
                  caption={`from ${
                    dataModelStats?.protocol
                      ?.getTotalCredentialsByDataModelGroupByRecipient -
                    dataModelStatsYesterday?.recipient_count?.aggregate?.count
                  } (in 1 day)`}
                  indicator={calculateGrowth(
                    dataModelStats?.protocol
                      ?.getTotalCredentialsByDataModelGroupByRecipient,
                    dataModelStatsYesterday?.recipient_count?.aggregate?.count
                  )}
                />
              </Stack>
            )}

            <TableSchema
              title="Claim"
              data={dataModelSelected?.schema?.properties}
              subtitle1="Field"
              subtitle2="Input Type"
            />
          </Stack>
        </ModalRight>
      </Stack>
    </>
  );
}

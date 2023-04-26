import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

import Loading from '../../../../../components/atoms/loading';
import { query } from '../../../../../constants/queries';
import { gqlAnonMethods } from '../../../../../services/hasura/api';
import { DataModelCard } from '../../../../molecules/data-model-card';
import DataModelsP2P from './data-models-p2p';
import DataModels from './data-models';

export default function DataModelsTab(): JSX.Element {
  const internalPageSize = 16;
  // const {
  //   data: dataModels,
  //   isLoading,
  //   isFetchingNextPage,
  //   fetchNextPage,
  // } = useInfiniteQuery(
  //   [query.dataModels],
  //   async ({ pageParam }) => {
  //     const result = await gqlAnonMethods.dataModels({
  //       take: internalPageSize,
  //       skip: pageParam || 0,
  //     } as any);

  //     return result.protocol_data_model;
  //   },
  //   {
  //     getNextPageParam: (lastPage, pages) =>
  //       lastPage.length < internalPageSize
  //         ? undefined
  //         : pages.length * internalPageSize,
  //   }
  // );

  // useEffect(() => {
  //   let fetching = false;
  //   const onScroll = async (event) => {
  //     const { scrollHeight, scrollTop, clientHeight } =
  //       event.target.scrollingElement;

  //     if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.05) {
  //       fetching = true;
  //       await fetchNextPage();
  //       fetching = false;
  //     }
  //   };

  //   document.addEventListener('scroll', onScroll);
  //   return () => {
  //     document.removeEventListener('scroll', onScroll);
  //   };
  // }, []);

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      <>
        <DataModelsP2P />
        <DataModels />
      </>
    </Box>
  );
}

import { useMemo } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { List, ListItem } from '@mui/material';

import { CredentialData } from '@/services/gateway-protocol/types';

export function ListView(data: PartialDeep<CredentialData>) {
  const items = useMemo(() => {
    let list = [];
    if (data?.value?.indexOf(',') > -1) {
      list = data?.value.split(',');
    } else if (data?.value !== '') {
      list.push(data.value);
    }
    return list;
  }, [data]);

  return (
    <List sx={{ listStyle: 'inside' }}>
      {items.map((item, index) => (
        <ListItem key={index} sx={{ display: 'list-item', p: 0 }}>
          {item}
        </ListItem>
      ))}
    </List>
  );
}

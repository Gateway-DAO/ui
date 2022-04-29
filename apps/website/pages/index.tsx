import { useState } from 'react';

import { Navbar } from '@gateway/ui';

import { mockDaos } from '../__mock__/daos';
import { DashboardTemplate } from '../components/templates/dashboard';
import { Dao } from '../types/dao';

export function Index() {
  const [currentDao, setCurrentDao] = useState<Dao>();
  return (
    <DashboardTemplate
      followingDaos={mockDaos}
      currentDao={currentDao}
      containerProps={{ sx: { pt: 2 } }}
    >
      <Navbar />
      <button type="button" onClick={() => setCurrentDao(mockDaos[1])}>
        Go to followed dao
      </button>
      <button
        type="button"
        onClick={() => setCurrentDao({ id: '999', name: 'Temporary Dao' })}
      >
        Go to temporary dao
      </button>
      <button type="button" onClick={() => setCurrentDao(undefined)}>
        reset
      </button>
      Just a test
    </DashboardTemplate>
  );
}

export default Index;

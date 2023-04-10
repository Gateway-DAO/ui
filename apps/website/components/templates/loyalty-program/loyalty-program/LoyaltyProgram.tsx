import { PartialDeep } from 'type-fest/source/partial-deep';

import { Loyalty_Program } from '../../../../services/hasura/types';
import LoyaltyProgramTemplate from '../LoyaltyProgramTemplate';
import { LoyaltySidebar } from '../components/LoyaltySidebar';
import { LoyaltyProgramMainContent } from './components/LoyaltyProgramMainContent';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
};

export function LoyaltyProgram({ loyalty }: Props) {
  //   id: {loyalty.id}
  //   name: {loyalty.name}
  //   description: {loyalty.description}
  //   image: {loyalty.image}
  //   categories: {loyalty.categories}

  return (
    <LoyaltyProgramTemplate
      sidebar={<LoyaltySidebar loyalty={loyalty} />}
      mainContent={<LoyaltyProgramMainContent loyalty={loyalty} />}
    />
  );
}

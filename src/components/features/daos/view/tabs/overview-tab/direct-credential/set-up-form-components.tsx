import { Dispatch } from 'react';

import RecipientTemplate from './components/recipient-template';
import CredentialTemplate from '../base/credential-template';
import DetailsTemplate from '../base/details-template';
import OptionalSettings from '../base/optional-settings';

type Props = {
  updateFormState: Dispatch<any>;
  handleStep: (value: boolean) => void;
  fullFormState: any;
};

export const setUpFormComponents = ({
  updateFormState,
  handleStep,
  fullFormState,
}: Props): JSX.Element[] => {
  return [
    <CredentialTemplate
      updateFormState={updateFormState}
      key={1}
      handleStep={handleStep}
      fullFormState={fullFormState}
      input={{ name: 'template' }}
    />,

    <DetailsTemplate
      key={2}
      input={{
        name: 'details',
      }}
    />,
    <RecipientTemplate
      key={3}
      handleStep={handleStep}
      input={{ name: 'recipient' }}
    />,
    <OptionalSettings
      key={4}
      handleStep={handleStep}
      input={{ name: 'task' }}
      enableClaimLimit={false}
    />,
  ];
};

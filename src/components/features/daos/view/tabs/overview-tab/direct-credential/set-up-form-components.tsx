import { Dispatch } from 'react';

import RecipientTemplate from './components/recipient-template';
import OptionalSettingsTemplate from './components/optional-settings-template';
import CredentialTemplate from '../quest/components/credential-template';
import DetailsTemplate from '../quest/components/details-template';

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
    <RecipientTemplate
      updateFormState={updateFormState}
      key={3}
      handleStep={handleStep}
      input={{ name: 'recipient' }}
    />,
    <CredentialTemplate
      updateFormState={updateFormState}
      key={1}
      handleStep={handleStep}
      input={{ name: 'template' }}
    />,
    <DetailsTemplate
      updateFormState={updateFormState}
      key={2}
      fullFormState={fullFormState}
      handleStep={handleStep}
      input={{
        name: 'details',
      }}
    />,

    <OptionalSettingsTemplate
      updateFormState={updateFormState}
      key={3}
      handleStep={handleStep}
      input={{ name: 'task' }}
    />,
  ];
};

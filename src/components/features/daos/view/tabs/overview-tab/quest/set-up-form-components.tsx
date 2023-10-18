import { Dispatch } from 'react';
import CredentialTemplate from '../base/credential-template';
import DetailsTemplate from '../base/details-template';
import TasksTemplate from './components/tasks-template';
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
      input={{ name: 'template' }}
      fullFormState={fullFormState}
    />,
    <DetailsTemplate
      key={2}
      input={{
        name: 'details',
      }}
    />,
    <TasksTemplate key={3} handleStep={handleStep} input={{ name: 'task' }} />,
    <OptionalSettings
      key={3}
      handleStep={handleStep}
      input={{ name: 'task' }}
      enableClaimLimit={true}
    />,
  ];
};

import { Dispatch } from 'react';
import CredentialTemplate from './components/credential-template';
import DetailsTemplate from './components/details-template';
import TasksTemplate from './components/tasks-template';
import OptionalSettingsTemplate from './components/optional-settings-template';

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
    <TasksTemplate
      updateFormState={updateFormState}
      key={3}
      handleStep={handleStep}
      input={{ name: 'task' }}
    />,
    <OptionalSettingsTemplate
      updateFormState={updateFormState}
      key={3}
      handleStep={handleStep}
      input={{ name: 'task' }}
    />,
  ];
};

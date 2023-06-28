import { Dispatch } from 'react';
import { CreateQuestTemplate } from './create-quest';
import CredentialTemplate from './components/credential-template';



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
    <CredentialTemplate updateFormState={updateFormState} key={1} handleStep={handleStep} input={{ name: 'template', preview: false, saveAsDraft: false }} />,
    <CredentialTemplate updateFormState={updateFormState} key={2} handleStep={handleStep} input={{ name: 'details', preview: false, saveAsDraft: false }} />,
    <CredentialTemplate updateFormState={updateFormState} key={3} handleStep={handleStep} input={{ name: 'task', preview: true, saveAsDraft: false }} />,
    
  ];
};

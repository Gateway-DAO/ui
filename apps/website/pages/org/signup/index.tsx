import useTranslation from 'next-translate/useTranslation';

import { HeadContainer } from '../../../components/molecules/head-container';
import { OrgSignUpTemplate } from '../../../components/templates/org/signup/signup';

export default function SignUpPage() {
  const { t } = useTranslation('org-signup');

  return (
    <>
      <HeadContainer title={t('page-title')} description={'page-description'} />
      <OrgSignUpTemplate />
    </>
  );
}

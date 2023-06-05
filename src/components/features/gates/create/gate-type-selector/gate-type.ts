import useTranslation from 'next-translate/useTranslation';

import { CheckCircle, Send, type SvgIconComponent } from '@mui/icons-material';

import { type GateType } from '../schema';

export function useCreateGateData() {
  const { t } = useTranslation('gate-new');

  const typesContent: Record<
    GateType,
    { title: string; description: string; icon: SvgIconComponent }
  > = {
    task_based: {
      title: t('gate_type.task_based.title'),
      description: t('gate_type.task_based.description'),
      icon: CheckCircle,
    },
    direct: {
      title: t('gate_type.direct.title'),
      description: t('gate_type.direct.description'),
      icon: Send,
    },
  };

  return { typesContent, types: Object.keys(typesContent) as GateType[] };
}

import useTranslation from 'next-translate/useTranslation';

type Props = {
  dataModel: any;
};

export default function DataModelView({ dataModel }: Props) {
  const { t } = useTranslation('protocol');

  return <>{dataModel?.title}</>;
}

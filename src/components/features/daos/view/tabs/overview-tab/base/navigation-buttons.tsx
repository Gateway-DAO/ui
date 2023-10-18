import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  isLoading: boolean;
  handleOnClick: () => void;
  title: string;
  disabledCondition: boolean;
  variant: 'contained' | 'outlined';
};

export function NavigationButtons({
  isLoading,
  handleOnClick,
  disabledCondition,
  title,
  variant,
}: Props) {
  return (
    <LoadingButton
      onClick={handleOnClick}
      size="large"
      sx={{ marginLeft: 2 }}
      isLoading={isLoading}
      disabled={disabledCondition}
      variant={variant}
    >
      {title}
    </LoadingButton>
  );
}

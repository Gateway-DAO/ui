import useTranslation from 'next-translate/useTranslation';

import {
  Control,
  FieldValues,
  ArrayPath,
  useFieldArray,
} from 'react-hook-form';

import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { SocialLink } from './social-link';

export type SocialLinkGroup<TFormSchema> = {
  name: ArrayPath<TFormSchema>;
  control: Control<TFormSchema>;
};

export function SocialLinks<TFormSchema extends FieldValues = FieldValues>({
  control,
  name,
}: SocialLinkGroup<TFormSchema>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const { t } = useTranslation();

  return (
    <>
      {fields.map((field, index) => (
        <SocialLink
          key={field.id}
          name={`${name}.${index}`}
          onDelete={() => remove(index)}
          control={control}
        />
      ))}
      <Button
        variant="outlined"
        type="button"
        onClick={() => append({})}
        startIcon={<Add />}
        sx={{
          alignSelf: 'flex-start',
        }}
      >
        {t('common:fields.add-link')}
      </Button>
    </>
  );
}

import {
  Control,
  FieldValues,
  ArrayPath,
  useController,
  useFieldArray,
} from 'react-hook-form';

import { Card } from '@mui/material';

export type SocialLinkField<TFormSchema> = {
  name: ArrayPath<TFormSchema>;
  control: Control<TFormSchema>;
  index: number;
};

export function SocialLinks<TFormSchema extends FieldValues = FieldValues>({
  control,
  index,
  name,
}: SocialLinkField<TFormSchema>) {
  const {
    field: { ref, value, onChange, ...register },
    fieldState: { error },
  } = useController<TFormSchema>({ control, name });
  const { fields, append, update } = useFieldArray({
    control,
    name: name,
  });

  return <Card>social_link</Card>;
}

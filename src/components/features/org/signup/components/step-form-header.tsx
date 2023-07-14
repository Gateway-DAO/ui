import TextWithParagraphs from '@/components/atoms/text-with-paragraphs/text-with-paragraphs';

import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  description: string;
};

export default function StepFormHeader({ title, description }: Props) {
  return (
    <Stack gap={2} mb={4}>
      <Typography variant="h4">{title}</Typography>
      <TextWithParagraphs text={description} />
    </Stack>
  );
}

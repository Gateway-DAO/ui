import { Typography } from '@mui/material';

export default function TextWithParagraphs({
  text,
}: {
  text: string;
}): JSX.Element {
  const paragraphs = text.split('\n');

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <Typography variant="body1" key={index} mb={1}>
          {paragraph}
        </Typography>
      ))}
    </>
  );
}

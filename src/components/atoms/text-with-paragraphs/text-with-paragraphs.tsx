import { Typography } from '@mui/material';

type ReplaceConfig = {
  from: string;
  to: string;
};

export default function TextWithParagraphs({
  text,
  replaces,
}: {
  text: string;
  replaces?: ReplaceConfig[];
}): JSX.Element {
  if (replaces && replaces.length > 0) {
    replaces.forEach((replace) => {
      text = text.replace(replace.from, replace.to);
    });
  }

  const paragraphs = text.split('\n');

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <Typography
          dangerouslySetInnerHTML={{ __html: paragraph }}
          variant="body1"
          key={index}
          mb={1}
        >
          {/* {paragraph} */}
        </Typography>
      ))}
    </>
  );
}

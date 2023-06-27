import { Button, Divider, Stack } from '@mui/material';

export default function Footer() {
  return (
    <>
      <Divider />
      <Stack direction={"row"} sx={{mt:8}} justifyContent={"end"}>
        <Button variant="contained">Preview</Button>
        <Button variant="contained">Save as Draft</Button>
        <Button variant="contained">Contained</Button>
      </Stack>
    </>
  );
}

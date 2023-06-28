import { Button, Divider, Stack } from '@mui/material';

export default function Footer({fullFormState,handleNext}:{fullFormState:any,handleNext:any}) {
  console.log(fullFormState)
  return (
    <>
      <Divider />
      <Stack direction={"row"} sx={{mt:2}} justifyContent={"end"}>
        <Button variant="contained" disabled={!fullFormState?.template?.preview} onClick={()=>handleNext()}>Preview</Button>
        <Button variant="contained">Save as Draft</Button>
        <Button variant="contained">Contained</Button>
      </Stack>
    </>
  );
}

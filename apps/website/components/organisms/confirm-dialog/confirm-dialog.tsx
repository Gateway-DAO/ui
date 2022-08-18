import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const ConfirmDialog = (props) => {
  const {
    title,
    children,
    open,
    setOpen,
    onConfirm,
    positiveAnswer,
    negativeAnswer,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="secondary"
        >
          {negativeAnswer}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color="primary"
        >
          {positiveAnswer}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;

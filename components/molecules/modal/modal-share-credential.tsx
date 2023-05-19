import { PartialDeep } from 'type-fest/source/partial-deep';

import ShareOn from '../../atoms/share-on';
import ModalContent from './modal-basic';

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  credential: PartialDeep<Credential>;
  title: string;
};

export default function ModalShareCredential({
  open,
  handleClose,
  handleOpen,
  credential,
  title,
}: ModalProps) {
  return (
    <ModalContent
      open={open}
      title={title}
      handleClose={handleClose}
      handleOpen={handleOpen}
      swipeableDrawer={true}
      fullWidth
    >
      <ShareOn isCredential credential={credential} />
    </ModalContent>
  );
}

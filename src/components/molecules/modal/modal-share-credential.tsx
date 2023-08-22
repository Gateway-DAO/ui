import ShareOn from '@/components/atoms/share-on';
import { Loyalty_Program } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import ModalContent from './modal-basic';

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  credential?: PartialDeep<Credential>;
  title: string;
  isLoyalty?: boolean;
  loyaltyPass?: PartialDeep<Loyalty_Program>;
  actualTier?: string;
  loyaltyCredentialId?: string;
};

export default function ModalShareCredential({
  open,
  handleClose,
  handleOpen,
  credential,
  title,
  isLoyalty = false,
  loyaltyPass,
  actualTier,
  loyaltyCredentialId,
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
      {isLoyalty && loyaltyPass && actualTier && loyaltyCredentialId ? (
        <ShareOn
          isLoyaltyPass={true}
          loyaltyPass={loyaltyPass}
          actualTier={actualTier}
          loyaltyCredentialId={loyaltyCredentialId}
        />
      ) : (
        <ShareOn isCredential credential={credential} />
      )}
    </ModalContent>
  );
}

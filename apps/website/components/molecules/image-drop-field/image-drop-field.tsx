import { ChangeEvent, ReactNode, useEffect, useRef } from 'react';

import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useDropArea } from 'react-use';

import { Snackbar } from '@mui/material';

import { useSnackbar } from '../../../hooks/use-snackbar';
import { BackgroundImage } from './background-image';
import { Container } from './container';
import EditDropdownMenu from './edit-dropdown-menu';
import { ImageCropDialog, useImageCropState } from './image-crop-dialog';
import { Placeholder } from './placeholder';
import { HiddenInput } from './styles';

export type Props<TFormSchema> = {
  label: ReactNode;
  name: Path<TFormSchema>;
  control: Control<TFormSchema>;
  withCrop?: boolean;
};

/* TODO: improve state handling with xState */
export function ImageDropField<TFormSchema extends FieldValues = FieldValues>({
  label,
  name,
  control,
  withCrop = true,
}: Props<TFormSchema>) {
  const {
    field: { ref, value, onChange, ...register },
    fieldState: { error },
  } = useController<TFormSchema>({ control, name });

  const inputRef = useRef<HTMLInputElement>(null);
  const imageCropDialog = useImageCropState();
  const snackbar = useSnackbar();

  useEffect(() => {
    if (error?.message) {
      snackbar.onOpen({ message: error.message });
    }
  }, [error, snackbar.open]);

  const readFiles = (files: FileList | File[]) => {
    /* TODO: Mimetype validation */
    /* TODO: Filesize validation */
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = event.target.result as string;
      if (withCrop) {
        imageCropDialog.onOpen(image);
      } else {
        onChange(image);
      }
    };

    reader.readAsDataURL(file);
  };

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    readFiles(event.target.files);
    inputRef.current.value = '';
  };

  const onFocus = () => {
    inputRef.current?.click();
  };

  const onReset = () => {
    onChange(undefined);
  };

  const [dropBond, { over: isOver }] = useDropArea({
    onFiles: readFiles,
  });

  const onCrop = (image: string) => {
    onChange(image);
    imageCropDialog.onClose();
  };

  return (
    <>
      <Container {...{ dropBond, hasImage: !!value, isOver }}>
        {!value && <Placeholder label={label} />}
        <HiddenInput
          type="file"
          ref={(el) => {
            ref(el);
            inputRef.current = el;
          }}
          onChange={onSelectFile}
          accept="image/*"
          tabIndex={-1}
          {...register}
        />

        <EditDropdownMenu
          {...{
            name,
            hasImage: !!value,
            onReset,
            onClickUploadPhoto: onFocus,
          }}
        />
        {value && <BackgroundImage {...{ value, isOver }} />}
      </Container>
      {imageCropDialog.isOpen && (
        <ImageCropDialog
          image={imageCropDialog.image}
          onSubmit={onCrop}
          onClose={imageCropDialog.onClose}
        />
      )}
      <Snackbar
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal,
        }}
        open={snackbar.open}
        onClose={snackbar.handleClose}
        message={snackbar.message}
        key={name + 'snackbar'}
      />
    </>
  );
}

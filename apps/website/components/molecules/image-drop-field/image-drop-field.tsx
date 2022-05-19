import { ChangeEvent, ReactNode, useRef } from 'react';

import { Control, useController } from 'react-hook-form';
import { useDropArea } from 'react-use';

import { BackgroundImage } from './background-image';
import { Container } from './container';
import EditDropdownMenu from './edit-dropdown-menu';
import { ImageCropDialog, useImageCropState } from './image-crop-dialog';
import { Placeholder } from './placeholder';
import { HiddenInput } from './styles';

export type Props = {
  label: ReactNode;
  name: string;
  control: Control;
  withCrop?: boolean;
};

/* TODO: improve state handling with xState */
export function ImageDropField({ label, name, control, withCrop }: Props) {
  const {
    field: { ref, value, onChange, ...register },
  } = useController({ name, control });

  const inputRef = useRef<HTMLInputElement>(null);
  const imageCropDialog = useImageCropState();

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
    </>
  );
}

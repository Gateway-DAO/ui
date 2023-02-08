import { ChangeEvent, ReactNode, useEffect, useRef } from 'react';

import { useSnackbar } from 'notistack';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { useDropArea } from 'react-use';

import { BackgroundImage } from './background-image';
import { Container } from './container';
import EditDropdownMenu from './edit-dropdown-menu';
import { ImageCropDialog, useImageCropState } from './image-crop-dialog';
import { Placeholder } from './placeholder';
import { HiddenInput } from './styles';

export type Props<TFormSchema> = {
  label: ReactNode;
  hideLabel?: boolean;
  name: Path<TFormSchema>;
  control: Control<TFormSchema>;
  withCrop?: boolean;
  cropRatio?: number;
};

/* TODO: improve state handling with xState */
export function ImageDropField<TFormSchema extends FieldValues = FieldValues>({
  label,
  name,
  control,
  withCrop = true,
  cropRatio,
  hideLabel,
}: Props<TFormSchema>) {
  const {
    field: { ref, value, onChange, ...register },
    fieldState: { error },
  } = useController<TFormSchema>({ control, name });

  const inputRef = useRef<HTMLInputElement>(null);
  const imageCropDialog = useImageCropState();
  const { enqueueSnackbar } = useSnackbar();

  const readFiles = (files: FileList | File[]) => {
    const file = files[0];
    const reader = new FileReader();
    console.log(file);
    /* TODO: File size can be constant */
    const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (file.size <= 5245329 && imageTypes.includes(file.type)) {
      reader.onload = (event) => {
        const image = event.target.result as string;
        const isGif = event.target.result.toString().match('data:image/gif;');
        if (withCrop && !isGif) {
          imageCropDialog.onOpen(image);
        } else {
          onChange(image);
        }
      };

      reader.readAsDataURL(file);
    } else if (file.size > 5245329) {
      enqueueSnackbar('File size should be less than 5 mb', {
        variant: 'error',
      });
    } else {
      enqueueSnackbar('Only JPG,PNG,GIF,SVG are allowed', {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  }, [error]);

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
    onChange('');
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
      <Container
        {...{
          dropBond,
          hasImage: !!value,
          isOver,
          label: typeof label === 'string' ? label : undefined,
        }}
      >
        {!hideLabel && !value && <Placeholder label={label} />}
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

        {!!value && (
          <EditDropdownMenu
            {...{
              name,
              onReset,
              onClickUploadPhoto: onFocus,
            }}
          />
        )}
        {value && <BackgroundImage {...{ value, isOver }} />}
      </Container>
      {imageCropDialog.isOpen && (
        <ImageCropDialog
          image={imageCropDialog.image}
          onSubmit={onCrop}
          onClose={imageCropDialog.onClose}
          cropRatio={cropRatio}
        />
      )}
    </>
  );
}

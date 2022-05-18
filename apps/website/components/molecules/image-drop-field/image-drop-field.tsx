import { ChangeEvent, ClassAttributes, ReactNode, useRef } from 'react';

import { Control, useController } from 'react-hook-form';
import { useDropArea } from 'react-use';

import { BackgroundImage } from './background-image';
import { Container } from './container';
import EditDropdownMenu from './edit-dropdown-menu';
import { Placeholder } from './placeholder';
import { HiddenInput } from './styles';

type Props = {
  label: ReactNode;
  name: string;
  control: Control;
  withCrop?: boolean;
};

export function ImageDropField({ label, name, control, withCrop }: Props) {
  const {
    field: { ref, value, onChange, ...register },
  } = useController({ name, control });

  const inputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    transformFiles(event.target.files);
  };

  const transformFiles = (files: FileList | File[]) => {
    /* TODO: Mimetype validation */
    /* TODO: Filesize validation */
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const onFocus = () => {
    inputRef.current?.click();
  };

  const onReset = () => {
    onChange();
  };

  /* We need to access the input ref for */
  const onInputRef: ClassAttributes<HTMLInputElement>['ref'] = (el) => {
    ref(el);
    inputRef.current = el;
  };

  const [dropBond, { over: isOver }] = useDropArea({
    onFiles: transformFiles,
  });

  return (
    <>
      <Container {...{ dropBond, hasImage: !!value, isOver }}>
        {!value && <Placeholder label={label} />}
        <HiddenInput
          type="file"
          ref={onInputRef}
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
    </>
  );
}

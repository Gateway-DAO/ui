import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { DataModel } from '@/services/gateway-protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack } from '@mui/material';

import { ClaimFieldProps, claimFields, getClaimType } from './ClaimTypes';
import ClaimAccordion from './claim-accordion';
import ClaimFormArray from './claim-form-array';
import ClaimFormText from './claim-form-text';
import { ClaimImageField } from './claim-image-field';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

function ClaimField(props: ClaimFieldProps) {
  switch (props.type) {
    case claimFields.image:
      return <ClaimImageField {...props} />;
    case claimFields.array:
      return <ClaimFormArray {...props} />;
    default:
      return <ClaimFormText {...props} />;
  }
}

export default function ClaimForm({ dataModel }: Props) {
  const { t } = useTranslation('protocol');

  const fields = useMemo(() => {
    return dataModel?.schema?.properties;
  }, [dataModel]);

  return (
    <Stack>
      {fields && (
        <Stack gap={2}>
          {Object.keys(fields)?.map((item, index) => {
            const type = getClaimType(
              fields[item]?.type,
              fields[item]?.contentMediaType,
              fields[item]?.format
            );
            return (
              <ClaimAccordion
                key={index}
                type={type}
                label={fields[item]?.title}
              >
                <ClaimField
                  label={fields[item]?.title}
                  type={type}
                  fieldName={Object.keys(fields)[index]}
                  contentMediaType={fields[item]?.contentMediaType}
                  format={fields[item]?.format}
                  subType={fields[item]?.items?.type}
                />
              </ClaimAccordion>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}

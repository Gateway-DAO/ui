import { Protocol_Api_DataModel } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack } from '@mui/material';
import {
  ClaimFieldProps,
  claimFields,
  getClaimType,
} from '@/components/features/protocol/credentials/create/components/ClaimTypes';
import ClaimAccordion from '@/components/features/protocol/credentials/create/components/claim-accordion';
import ClaimFormArray from '@/components/features/protocol/credentials/create/components/claim-form-array';
import ClaimFormText from '@/components/features/protocol/credentials/create/components/claim-form-text';
import { ClaimImageField } from '@/components/features/protocol/credentials/create/components/claim-image-field';

type Props = {
  dataModel: PartialDeep<Protocol_Api_DataModel>;
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

export default function ClaimFormQuest({ fields }: any) {
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

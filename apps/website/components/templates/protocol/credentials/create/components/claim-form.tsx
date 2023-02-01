import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { alpha, Typography, Stack } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import { ClaimFieldProps } from './ClaimFieldProps';
import ClaimAccordion from './claim-accordion';
import ClaimFormText from './claim-form-text';
import { ImageField } from './image-field';

export const claimTypes = {
  image: 'image',
  text: 'text',
  number: 'number',
};

export const mapClaimFields = (
  type: string,
  contentMediaType: string = null
) => {
  if (contentMediaType) return claimTypes.image;
  switch (type) {
    case 'string':
      return claimTypes.text;
    case 'integer':
      return claimTypes.number;
    default:
      return claimTypes.text;
  }
};

function ClaimField(props: ClaimFieldProps) {
  switch (props.type) {
    case claimTypes.image:
      return <ImageField {...props} />;
    default:
      return <ClaimFormText {...props} />;
  }
}

type Props = {
  dataModel: PartialDeep<DataModel>;
};

export default function ClaimForm({ dataModel }: Props) {
  const { t } = useTranslation('protocol');

  const schemaFields = useMemo(() => {
    return dataModel?.schema?.properties;
  }, [dataModel]);

  return (
    <Stack>
      <Typography fontWeight={600}>
        {t('data-model.issue-credential.group-claim-title')}
      </Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        {t('data-model.issue-credential.group-claim-description')}
      </Typography>
      {schemaFields && (
        <Stack gap={2}>
          {Object.keys(schemaFields)?.map((item, index) => {
            return (
              <ClaimAccordion
                key={index}
                type={mapClaimFields(
                  schemaFields[item]?.type,
                  schemaFields[item]?.contentMediaType
                )}
                label={schemaFields[item]?.title}
              >
                <ClaimField
                  label={schemaFields[item]?.title}
                  type={mapClaimFields(
                    schemaFields[item]?.type,
                    schemaFields[item]?.contentMediaType
                  )}
                  fieldName={Object.keys(schemaFields)[index]}
                  contentMediaType={schemaFields[item]?.contentMediaType}
                />
              </ClaimAccordion>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}

import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { PartialDeep } from 'type-fest/source/partial-deep';

import { brandColors } from '@gateway/theme';

import { alpha, Typography, Stack } from '@mui/material';

import { DataModel } from '../../../../../../services/gateway-protocol/types';
import { ClaimFieldProps, claimFields, getClaimType } from './ClaimTypes';
import ClaimAccordion from './claim-accordion';
import ClaimFormArray from './claim-form-array';
import ClaimFormText from './claim-form-text';
import { ImageField } from './image-field';

type Props = {
  dataModel: PartialDeep<DataModel>;
};

function ClaimField(props: ClaimFieldProps) {
  switch (props.type) {
    case claimFields.image:
      return <ImageField {...props} />;
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
      <Typography fontWeight={600}>
        {t('data-model.issue-credential.group-claim-title')}
      </Typography>
      <Typography
        fontSize={14}
        sx={{ color: alpha(brandColors.white.main, 0.7), mb: 3 }}
      >
        {t('data-model.issue-credential.group-claim-description')}
      </Typography>
      {fields && (
        <Stack gap={2}>
          {Object.keys(fields)?.map((item, index) => {
            const type = getClaimType(
              fields[item]?.type,
              fields[item]?.contentMediaType
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

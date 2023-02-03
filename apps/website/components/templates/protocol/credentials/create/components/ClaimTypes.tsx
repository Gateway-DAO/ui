type ClaimTypes = {
  [x: string]: string;
};

export type ClaimFieldProps = {
  label: string;
  fieldName: string;
  type: string;
  contentMediaType?: string;
  subType?: string;
};

// List all claim fields
export const claimFields: ClaimTypes = {
  image: 'image',
  text: 'text',
  number: 'number',
  array: 'array',
};

// List all backend Types
export const mapBackendTypes = {
  integer: claimFields.number,
  float: claimFields.number,
  string: claimFields.text,
};

export const getClaimType = (
  backendType: string,
  contentMediaType: string = null
) => {
  if (contentMediaType) return claimFields.image;
  if (mapBackendTypes[backendType]) {
    backendType = mapBackendTypes[backendType];
  }
  return claimFields[backendType];
};

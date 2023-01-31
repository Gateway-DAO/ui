import { z } from 'zod';

type definedNonNullAny = any;

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export const createCredentialSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(2, 'The title must contain at least 2 character(s)'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(2, 'The description must contain at least 2 character(s)'),
  expirationDate: z.string().nullish(),
  claim: definedNonNullAnySchema.nullish(),
  dataModelId: z.string(),
  image: z.string().nullish(),
  issuerId: z.string(),
  recipientId: z.string(),
  status: definedNonNullAnySchema.nullish(),
  tags: z.array(z.string()),
});

export const createDataModelSchema = z.object({
  description: z.string(),
  groupId: z.string().nullish(),
  schema: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
});

export const createOrganizationSchema = z.object({
  description: z.string(),
  organization: z.string(),
});

export const createUserSchema = z.object({
  primaryWallet: z.lazy(() => definedNonNullAnySchema),
  roles: z.array(definedNonNullAnySchema).nullish(),
  status: z.string().nullish(),
});

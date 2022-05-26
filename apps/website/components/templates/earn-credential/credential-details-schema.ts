import { object, string, SchemaOf, date, bool } from 'yup';

export type CredentialDetailsSchema = {
  role: string;
  commitment_level: string;
  start_date: Date;
  end_date: Date;
  currently_working: boolean;
  responsabilities: string;
};

export const schema: SchemaOf<CredentialDetailsSchema> = object({
  role: string().defined(),
  commitment_level: string().defined(),
  start_date: date().defined(),
  end_date: date().defined(),
  currently_working: bool().defined(),
  responsabilities: string().defined(),
});

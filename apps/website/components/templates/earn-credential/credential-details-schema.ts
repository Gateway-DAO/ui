import { object, string, SchemaOf, date, bool } from 'yup';

export type CredentialDetailsTypes = {
  role: string;
  commitment_level: string;
  start_date: Date;
  end_date: Date;
  currently_working: boolean;
  responsibilities: string;
};

export const credentialDetailsSchema: SchemaOf<CredentialDetailsTypes> = object(
  {
    role: string().defined(),
    commitment_level: string().defined(),
    start_date: date().defined(),
    end_date: date().defined(),
    currently_working: bool().defined(),
    responsibilities: string().defined(),
  }
);

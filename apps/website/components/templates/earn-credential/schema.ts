import { object, string, SchemaOf, date, bool, array } from 'yup';

import { Credentials } from '../../../services/graphql/types.generated';

export type EarnCredentialSchema = Pick<Credentials, 'name' | 'description'> & {
  role: string;
  commitment_level: string;
  start_date: Date;
  end_date: Date;
  currently_working: boolean;
  responsabilities: string;
  accomplishments: Array<object>;
};

export const schema: SchemaOf<EarnCredentialSchema> = object({
  name: string().defined(),
  description: string().defined(),
  role: string().defined(),
  commitment_level: string().defined(),
  start_date: date().defined(),
  end_date: string().defined(),
  currently_working: bool().defined(),
  responsabilities: string().defined(),
  accomplishments: array(
    object({
      accomplishment_description: string().defined(),
      type: string().defined(),
      link: string().defined(),
      work_description: string().defined(),
    })
  ).defined(),
});

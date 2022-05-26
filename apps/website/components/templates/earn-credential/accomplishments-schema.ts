import { object, string, SchemaOf } from 'yup';

export type AccomplishmentsSchema = {
  accomplishment_title: string;
  accomplishment_description: string;
  pow_type: string;
  pow_link: string;
  pow_description: string;
};

export const schema: SchemaOf<AccomplishmentsSchema> = object({
  accomplishment_title: string().defined(),
  accomplishment_description: string().defined(),
  pow_type: string().defined(),
  pow_link: string().defined(),
  pow_description: string().defined(),
});

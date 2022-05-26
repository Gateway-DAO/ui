import { object, string, SchemaOf } from 'yup';

export type AccomplishmentsSchema = {
  accomplishment_title: string;
  accomplishment_description: string;
  type: string;
  link: string;
  pow_description: string;
};

export const schema: SchemaOf<AccomplishmentsSchema> = object({
  accomplishment_title: string().defined(),
  accomplishment_description: string().defined(),
  type: string().defined(),
  link: string().defined(),
  pow_description: string().defined(),
});

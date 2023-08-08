import { GateImageCard } from '@/components/features/gates/create/gate-image-card/gate-image-card';
import CategoriesInput from '@/components/molecules/form/categories-input';
import { CATEGORIES } from '@/constants/gate';
import { Box, Stack, TextField, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useFormContext } from 'react-hook-form';
import { CreateGateData } from '../schema';

export default function GeneralForm() {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<CreateGateData>();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      gap={2}
      sx={{
        width: '100%',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Stack
        sx={{
          maxWidth: { xs: '100%', md: '50%', lg: '70%' },
          width: '100%',
          mr: 3,
          ml: -1,
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 3, mt: 7 }}>
            General
          </Typography>
        </Box>
        <Stack direction="column">
          <Stack direction="column" gap={2}>
            <TextField
              label="Title"
              id="title"
              defaultValue={getValues('title')}
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{
                '& div fieldset legend span': {
                  marginRight: '4px',
                },
              }}
            />
            <CategoriesInput
              variant="outlined"
              label="category"
              id="categories"
              name="categories"
              error={!!errors.categories}
              defaultValue={getValues('categories')}
              {...register('categories')}
              categories={CATEGORIES}
              helperText={(errors.categories as any)?.message?.toString()}
              sx={{
                width: '100%',
                '& div fieldset legend span': {
                  marginRight: '10px',
                },
              }}
              set={(tags: string[]) => {
                setValue('categories', tags);
              }}
            />
            <TextField
              multiline
              rows={5}
              defaultValue={getValues('description')}
              InputProps={{
                disableUnderline: true,
                sx: {
                  '&.Mui-focused': {
                    borderBottom: '2px solid #9A53FF',
                  },
                },
              }}
              label="description"
              id="description"
              {...register(`description`)}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Stack>
        </Stack>
      </Stack>

      <GateImageCard
        draftImage={getValues('image')}
        label={
          <>
            <Typography textAlign={'center'} paddingX={4}>
              Drop or{' '}
              <Typography color={'primary'} display={'inline'}>
                upload
              </Typography>{' '}
              your credential image
            </Typography>
          </>
        }
        sx={{
          width: 300,
          marginTop: '55px',
        }}
      />
    </Stack>
  );
}

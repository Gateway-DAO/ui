import useTranslation from 'next-translate/useTranslation';

import {
  CreateGateData,
  Parameter,
  TrackOnChainEventsDataError,
} from '@/components/features/gates/create/schema';
import { brandColors, theme } from '@/theme';
import { useFormContext } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material';

import { mockParamsType } from '../__mock__';

export function Parameters({
  parameters,
  taskId,
  removeParameter,
  ...rest
}): JSX.Element {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CreateGateData>();
  const { t } = useTranslation('gate-new');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  const getParametersValues = watch(`tasks.${taskId}.task_data.parameters`);
  const typeIsNumber = (index: number): boolean => {
    return getParametersValues?.[index]?.type?.indexOf('uint') > -1;
  };

  const getOperators = (isNumber: boolean) => {
    return isNumber
      ? [
          {
            value: 'equal_to',
            label: '=',
          },
          {
            value: 'greater_than',
            label: '>',
          },
          {
            value: 'less_than',
            label: '<',
          },
        ]
      : [
          {
            value: 'equal_to',
            label: '=',
          },
          {
            value: 'not_equal_to',
            label: '!=',
          },
        ];
  };

  return (
    <Stack
      alignItems={'flex-start'}
      sx={{
        width: '100%',
      }}
      {...rest}
    >
      {parameters.map((parameter: Parameter, index: number) => (
        <>
          <Stack
            key={parameter.id}
            sx={{
              width: '100%',
              py: 2,
            }}
          >
            <Stack
              gap={2}
              sx={{
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'flex-start', md: 'center' },
              }}
            >
              <Stack sx={{ width: { xs: '100%', md: 250 } }}>
                <FormControl>
                  <InputLabel htmlFor="type">
                    {t('tasks.track_onchain.parameter')}
                  </InputLabel>
                  <Select
                    label={t('tasks.track_onchain.parameter')}
                    id="type"
                    {...register(
                      `tasks.${taskId}.task_data.parameters.${index}.type`
                    )}
                  >
                    {mockParamsType.map((param) => (
                      <MenuItem
                        key={param.id}
                        value={`${param.name} ${param.type}`}
                      >
                        <span style={{ marginRight: 6 }}>{param.name}</span>
                        <span style={{ color: brandColors.purple.main }}>
                          {param.type}
                        </span>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Stack sx={{ width: { xs: '100%', md: 100 } }}>
                <FormControl>
                  <Select
                    id="type"
                    {...register(
                      `tasks.${taskId}.task_data.parameters.${index}.operator`
                    )}
                  >
                    {getOperators(typeIsNumber(index)).map((operator) => (
                      <MenuItem key={operator.value} value={operator.value}>
                        {operator.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <TextField
                sx={{ flexGrow: 1, width: { xs: '100%', md: 'auto' } }}
                variant="outlined"
                placeholder={t('tasks.track_onchain.parameter')}
                id="value"
                {...register(
                  `tasks.${taskId}.task_data.parameters.${index}.value`,
                  {
                    min: 0,
                    valueAsNumber: typeIsNumber(index),
                    onBlur: () => {
                      if (
                        isNaN(getParametersValues[index].value) &&
                        typeIsNumber(index)
                      ) {
                        setValue(
                          `tasks.${taskId}.task_data.parameters.${index}.value`,
                          0
                        );
                      }
                    },
                  }
                )}
                type={typeIsNumber(index) ? 'number' : 'text'}
                error={
                  !!(
                    errors.tasks?.[taskId]
                      ?.task_data as TrackOnChainEventsDataError
                  )?.parameters?.[index]?.value
                }
                helperText={
                  (
                    errors.tasks?.[taskId]
                      ?.task_data as TrackOnChainEventsDataError
                  )?.parameters?.[index]?.value?.message
                }
              />
              {parameters.length > 1 && (
                <IconButton
                  sx={{ cursor: 'pointer' }}
                  onClick={() => removeParameter(index)}
                >
                  {isMobile ? (
                    <Button>{t('tasks.track_onchain.remove')}</Button>
                  ) : (
                    <CloseIcon />
                  )}
                </IconButton>
              )}
            </Stack>
          </Stack>
        </>
      ))}
    </Stack>
  );
}

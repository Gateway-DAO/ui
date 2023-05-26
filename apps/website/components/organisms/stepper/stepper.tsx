import useTranslation from 'next-translate/useTranslation';

import { brandColors } from '@gateway/theme';

import { Check } from '@mui/icons-material';
import { Avatar, Divider, Stack, Typography, alpha } from '@mui/material';

type Props = {
  activeStep: number;
};

type StepProps = {
  activeStep: number;
  index: number;
  title: string;
  isLast?: boolean;
};

const Step = ({ activeStep, index, title, isLast }: StepProps) => {
  return (
    <>
      {index !== 0 && (
        <Divider
          sx={{ height: '30px', width: '2px', ml: 1.5 }}
          orientation="vertical"
          color={isLast ? '#332b3e' : brandColors.purple.main}
          flexItem
        />
      )}
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar
          sx={{
            backgroundColor: isLast
              ? alpha(brandColors.white.main, 0.15)
              : brandColors.purple.main,
            width: '24px',
            height: '24px',
            fontSize: index >= activeStep ? '14px' : 'default',
            fontWeight: index >= activeStep ? 700 : 'regular',
          }}
        >
          {index < activeStep ? <Check fontSize="small" /> : <>{index + 1}</>}
        </Avatar>
        <Typography
          variant="body1"
          color={
            index === activeStep
              ? brandColors.white.main
              : alpha(brandColors.white.main, 0.5)
          }
        >
          {title}
        </Typography>
      </Stack>
    </>
  );
};
//TODO: Update this component to be generic as MUI stepper
export default function Stepper() {
  const { t } = useTranslation('org-signup');

  const steps = [
    {
      activeStep: 1,
      title: t('step-success.stepper-1'),
    },
    {
      activeStep: 1,
      title: t('step-success.stepper-2'),
    },
    {
      activeStep: 1,
      title: t('step-success.stepper-3'),
    },
  ];

  return (
    <Stack direction="column">
      {steps.map((step, index) => (
        <Step
          key={index}
          index={index}
          title={step.title}
          activeStep={step.activeStep}
          isLast={steps.length === index + 1}
        />
      ))}
      {/* <Stack direction="row" alignItems="center" gap={2}>
        <Avatar
          sx={{
            backgroundColor: brandColors.purple.main,
            width: '24px',
            height: '24px',
          }}
        >
          <Check fontSize="small" />
        </Avatar>
        <Typography variant="body1" color={alpha(brandColors.white.main, 0.5)}>
          {t('step-success.stepper-1')}
        </Typography>
      </Stack>
      <Divider
        sx={{ height: '30px', width: '2px', ml: 1.5 }}
        orientation="vertical"
        color={brandColors.purple.main}
        flexItem
      />
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar
          sx={{
            backgroundColor: brandColors.purple.main,
            width: '24px',
            height: '24px',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          2
        </Avatar>
        <Typography variant="body1">{t('step-success.stepper-2')}</Typography>
      </Stack>
      <Divider
        sx={{ height: '30px', width: '2px', ml: 1.5 }}
        orientation="vertical"
        color="#332b3e"
        flexItem
      />
      <Stack direction="row" alignItems="center" gap={2}>
        <Avatar
          sx={{
            backgroundColor: alpha(brandColors.white.main, 0.15),
            width: '24px',
            height: '24px',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          3
        </Avatar>
        <Typography variant="body1" color={alpha(brandColors.white.main, 0.5)}>
          {t('step-success.stepper-3')}
        </Typography>
      </Stack> */}
    </Stack>
  );
}

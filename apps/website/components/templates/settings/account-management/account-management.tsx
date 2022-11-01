import { Link, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "../../../../components/atoms/loading-button";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { accountManagementSchema } from "./types";
import { gqlAnonMethods } from "../../../../../website/services/api";
import { brandColors } from "@gateway/theme";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";

const AccountManagementSettings = () => {
  const {
    register,
    getValues,
    formState: { errors, isSubmitSuccessful, isDirty, isValid },
  } = useForm({
    resolver: zodResolver(accountManagementSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: '',
    },
  });

  const formValues = getValues();
  const { t } = useTranslation('settings');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [timeToResend, setTimeToResend] = useState<number>(30);
  const [emailVerified, setEmailVerified] = useState<boolean>(true);
  const [initialState, setInitialState] = useState<boolean>(true);
  const countDownInterval = useRef<any>()
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    return () => clearInterval(countDownInterval.current);
  }, []);

  useEffect(() => {
    if (emailSent) {
      let timer = 30;
      countDownInterval.current = setInterval(() => {
        timer = timer - 1;
        setTimeToResend(timer);
        if (timer == 0) {
          setCodeSent(false);
          setEmailSent(false);
          setTimeToResend(30);
        }
      }, 1000);
    } else {
      clearInterval(countDownInterval.current);
      countDownInterval.current = null;
    }
  }, [emailSent]);

  const {
    mutateAsync: accountManagement,
    isSuccess,
    isLoading,
  } = useMutation(
    ['accountManagement'],
  );

  const onSendingEmail = async (event) => {
    setCodeSent(true);
    setEmailSent(true);
    setEmailVerified(false);
    setInitialState(false);
    event.preventDefault();
    try {
      const response = await accountManagement();
      if (response) {
        setEmailSent(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const onVerify = async (event) => {
    event.preventDefault();
    enqueueSnackbar('Email successfully verified');
    resetForm();
  };

  const resetForm = () => {
    setEmailVerified(true);
    setCodeSent(false);
    setEmailSent(false);
  };

  return (
    <Stack>
      <Stack sx={{ width: '100%', mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 7 }}>{t('nav.account-management-title')}</Typography>
        <Typography fontSize="16px" sx={{ fontWeight: 600 }}>{t('account-management.registered-email-title')}</Typography>
        <Typography variant="body2" fontSize="12px">
          {t('account-management.registered-email-description')}
          <Link sx={{ color: brandColors.purple.main, textDecoration: 'none', cursor: 'pointer' }}> {t('account-management.here')}</Link>.
        </Typography>
      </Stack>
      <Stack sx={{ width: '100%', mb: 3 }}>
        <TextField
          sx={{ mb: 4 }}
          variant="outlined"
          type="email"
          name="email"
          disabled={emailSent}
          error={!!errors?.email}
          onKeyDown={(e) => {
            setEmailSent(false);
            setInitialState(true);
          }}
          helperText={t('account-management.email-address-helper')}
          {...register('email', { required: true })}
          placeholder={t('account-management.email-address-label')}
        />
        {formValues.email !== '' && !errors?.email && emailVerified && initialState && (
          <LoadingButton
            variant="contained"
            isLoading={isLoading}
            onClick={(e) => onSendingEmail(e)}
            sx={() => ({
              height: '42px',
              display: 'flex',
              width: '205px',
              borderRadius: '20px'
            })}
          >
            {t('account-management.email-address-action')}
          </LoadingButton>
        )}
      </Stack>

      {!emailVerified && (
        <>
          <Stack sx={{ width: '100%', mb: 4 }}>
            <Typography fontSize="16px" sx={{ fontWeight: 600 }}>{t('account-management.verify-your-email-title')}</Typography>
            <Typography variant="body2" fontSize="12px">{t('account-management.verify-your-email-description')}</Typography>
          </Stack>
          <TextField
            sx={{ width: '315px', mb: 2 }}
            variant="outlined"
            type="text"
            name="code"
            error={!!errors?.code}
            {...register('code', { required: false })}
            placeholder={t('account-management.code-placeholder')}
          />
          <Stack direction="row">
            <LoadingButton
              variant="contained"
              isLoading={isLoading}
              onClick={(e) => onVerify(e)}
              sx={() => ({
                height: '42px',
                display: 'flex',
                borderRadius: '20px',
                mr: 1
              })}
            >
              {t('account-management.code-action')}
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              isLoading={isLoading}
              disabled={emailSent || !!errors?.email}
              onClick={(e) => onSendingEmail(e)}
              sx={() => ({
                height: '42px',
                display: 'flex',
                borderRadius: '20px'
              })}
            >
              {t('account-management.code-send-again')} {timeToResend && codeSent ? `(${timeToResend})` : ''}
            </LoadingButton>
          </Stack>
        </>
      )}
    </ Stack>
  );
};

export default AccountManagementSettings;

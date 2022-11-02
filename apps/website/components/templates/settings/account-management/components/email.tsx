import { Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "../../../../../components/atoms/loading-button";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { emailSchema } from "./../types";
import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { useAuth } from "apps/website/providers/auth";


const Email = () => {
  const { gqlAuthMethods, me } = useAuth();
  const {
    register,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
    defaultValues: {
      email: me?.email_address,
      code: '',
    },
  });

  const initialTime = 30;
  const email = watch('email');
  const code = watch('code');
  const { t } = useTranslation('settings');
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [timeToResend, setTimeToResend] = useState<number>(initialTime);
  const [emailVerified, setEmailVerified] = useState<boolean>(true);
  const [errorVerify, setErrorVerify] = useState(null);
  const countDownInterval = useRef<any>(null)
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: createCode, isLoading: isLoadingCreateCode } = useMutation(
    (data: any) => gqlAuthMethods.create_code({ user_id: data.user_id, email: data.email })
  );

  const { mutateAsync: verifyCode, isLoading: isLoadingVerifyCode, error: errorVerifyCode } = useMutation(
    (data: any) => gqlAuthMethods.verify_code({ user_id: data.user_id, email: data.email, code: data.code })
  );

  const onSendingEmail = async (event) => {
    event.preventDefault();
    try {
      const response = await createCode({ user_id: me?.id, email });
      if (response) {
        enqueueSnackbar(t('account-management.email-sent'));
        setCodeSent(true);
        setEmailSent(true);
        setEmailVerified(false);
        setValue('code', '');
        setErrorVerify(null);
        clearErrors('code');
        return true;
      }
      return false;
    } catch (error) {
      if (error?.response?.errors[0]?.message) {
        enqueueSnackbar(error?.response?.errors[0]?.message, { variant: 'error' });
      } else {
        enqueueSnackbar(t('account-management.email-error-sending'), { variant: 'error' });
      }
      return error;
    }
  };

  const onVerify = async (event) => {
    event.preventDefault();
    if (!email || !code || email === '' || code === '') {
      return;
    }
    try {
      const response = await verifyCode({ user_id: me?.id, email, code });
      if (response?.verify_code?.success) {
        enqueueSnackbar(t('account-management.email-verified'));
        resetForm();
        return true;
      }
      return false;
    } catch (error) {
      if (error?.response?.errors[0]?.message) {
        enqueueSnackbar(error?.response?.errors[0]?.message, { variant: 'error' });
      } else {
        enqueueSnackbar(t('account-management.email-error-validating'), { variant: 'error' });
      }
      return error;
    }
  };

  useEffect(() => {
    if (emailSent) {
      let timer = initialTime;
      countDownInterval.current = setInterval(() => {
        timer = timer - 1;
        setTimeToResend(timer);
        if (timer == 0) {
          setCodeSent(false);
          setEmailSent(false);
          setTimeToResend(initialTime);
        }
      }, 1000);
    } else {
      clearInterval(countDownInterval.current);
      countDownInterval.current = null;
    }
  }, [emailSent]);

  useEffect(() => {
    if ((errorVerifyCode as any)?.response?.errors?.length) {
      setErrorVerify((errorVerifyCode as any)?.response?.errors[0]?.message);
    } else {
      setErrorVerify(null);
    }
  }, [errorVerifyCode]);

  const resetForm = () => {
    setEmailVerified(true);
    setCodeSent(false);
    setEmailSent(false);
  };

  const showSendButton = () => {
    return !emailSent &&
    !errors?.email &&
    emailVerified &&
    email !== me?.email_address &&
    email !== '';
  }

  return (
    <Stack sx={{ mb: 4 }}>
      <Stack sx={{ width: '100%', mb: 3 }}>
        <TextField
          sx={{ mb: 4 }}
          variant="outlined"
          type="email"
          name="email"
          disabled={emailSent}
          error={!!errors?.email}
          onKeyUp={(e) => {
            setEmailSent(false);
          }}
          helperText={t('account-management.email-address-helper')}
          {...register('email', { required: true })}
          placeholder={t('account-management.email-address-label')}
        />
        {
          showSendButton() && (
          <LoadingButton
            variant="contained"
            isLoading={isLoadingCreateCode}
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
            onKeyUp={(e) => {
              setErrorVerify(null);
            }}
            error={!!errors?.code || !!errorVerify}
            helperText={!!errors?.code ? errors?.code.message : !!errorVerify ? errorVerify : ''}
            {...register('code', { required: true })}
            placeholder={t('account-management.code-placeholder')}
          />
          <Stack direction="row">
            <LoadingButton
              variant="contained"
              isLoading={isLoadingVerifyCode}
              disabled={!!errors?.code || code == ''}
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
              isLoading={isLoadingCreateCode}
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

export default Email;

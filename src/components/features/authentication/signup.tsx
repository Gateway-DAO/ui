// import useTranslation from 'next-translate/useTranslation';
// import { useRouter } from 'next/router';
// import { useState } from 'react';

// import Loading from '@/components/atoms/loadings/loading';
// import { errorMessages } from '@/constants/error-messages';
// import { mutation } from '@/constants/queries';
// import { useAuth } from '@/providers/auth';
// import { ErrorResponse } from '@/types/graphql';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useMutation } from '@tanstack/react-query';
// import { useSnackbar } from 'notistack';
// import { useForm, FormProvider } from 'react-hook-form';

// import { ConnectMoreAuthDialog } from './components/connect-more-auth-dialog';
// import {
//   schemaCreateAccount,
//   schemaTokenConfirmation,
//   NewUserSchema,
//   TokenConfirmationSchema,
// } from './schema';
// import { FormVerifyToken } from './sections/verify-token';

// export function Signup() {
//   const { t } = useTranslation('authentication');
//   const [showConnectMoreAuthDialog, setShowConnectMoreAuthDialog] =
//     useState(false);
//   const { me, hasuraUserService } = useAuth();
//   const [sentEmail, setSentEmail] = useState(false);
//   const [sendEmailData, setSendEmailData] = useState(null);
//   const [profileCreated, _setProfileCreated] = useState(false);
//   const methodsSendEmail = useForm<NewUserSchema>({
//     resolver: yupResolver(schemaCreateAccount),
//     defaultValues: {
//       username: me?.username ?? '',
//       email_address: me?.email_address ?? '',
//     },
//   });
//   const methodsConfirmToken = useForm<TokenConfirmationSchema>({
//     resolver: yupResolver(schemaTokenConfirmation),
//   });

//   const { enqueueSnackbar } = useSnackbar();

//   const signupMutation = useMutation(
//     [mutation.signup_email],
//     async (data: NewUserSchema) => {
//       setSendEmailData(data);
//       return hasuraUserService.protocol_signup({
//         email: data.email_address,
//         gateway_id: data.username,
//       });
//     },
//     {
//       onSuccess(data) {
//         setSentEmail(true);
//         enqueueSnackbar(
//           `${t('form.code-sent-to')} ${data.protocol.signup.email}`
//         );
//       },
//       onError(error: ErrorResponse) {
//         error.response?.errors?.forEach(({ message }) => {
//           if (message === 'GATEWAY_ID_ALREADY_REGISTERED') {
//             methodsSendEmail.setError('username', {
//               message: errorMessages.GATEWAY_ID_ALREADY_REGISTERED,
//             });
//           } else if (message === 'EMAIL_ALREADY_REGISTERED') {
//             methodsSendEmail.setError('email_address', {
//               message: errorMessages.EMAIL_ALREADY_REGISTERED,
//             });
//           } else {
//             enqueueSnackbar(
//               errorMessages[message] || errorMessages.UNEXPECTED_ERROR,
//               {
//                 variant: 'error',
//               }
//             );
//           }
//         });
//       },
//     }
//   );

//   const signupConfirmationMutation = useMutation(
//     ['signupConfirmation'],
//     async (data: TokenConfirmationSchema) => {
//       return hasuraUserService.protocol_signup_confirmation({
//         code: parseInt(data.token, 10),
//         gateway_id: sendEmailData.username,
//         email: sendEmailData.email_address,
//         wallet: me?.wallet,
//       });
//     },
//     {
//       onSuccess() {
//         enqueueSnackbar(t('form.profile-created'));
//         // change the code to make it dynamically: here done this just to show the flow
//         setShowConnectMoreAuthDialog(true);
//       },
//       onError(error: ErrorResponse) {
//         error.response?.errors?.forEach(({ message }) => {
//           if (message === 'INVALID_CODE_VERIFICATION') {
//             methodsConfirmToken.setError('token', {
//               message: errorMessages.INVALID_CODE_VERIFICATION,
//             });
//           } else {
//             if (message === 'MAXIMUM_ATTEMPTS_REACHED') {
//               methodsConfirmToken.setValue('token', '');
//               setSentEmail(false);
//             }
//             enqueueSnackbar(
//               errorMessages[message] || errorMessages.UNEXPECTED_ERROR,
//               {
//                 variant: 'error',
//               }
//             );
//           }
//         });
//       },
//     }
//   );

//   const onSubmitSendEmail = (data: NewUserSchema) =>
//     signupMutation.mutate(data);

//   const onSubmitConfirmToken = (data: TokenConfirmationSchema) =>
//     signupConfirmationMutation.mutate(data);

//   return (
//     <>
//       {profileCreated ? (
//         <Loading />
//       ) : (
//         <>
//           {/* {!sentEmail ? (
//             <FormProvider {...methodsSendEmail}>
//               <SignUpFlow
//                 onSubmitSendEmail={onSubmitSendEmail}
//                 isLoading={signupMutation.isLoading}
//               />
//             </FormProvider>
//           ) : (
//             <FormProvider {...methodsConfirmToken}>
//               <FormVerifyToken
//                 onSubmitConfirmToken={onSubmitConfirmToken}
//                 isLoadingConfirmToken={signupConfirmationMutation.isLoading}
//                 onSubmitSendEmail={onSubmitSendEmail}
//                 isLoadingSendEmail={signupMutation.isLoading}
//                 sendEmailData={sendEmailData}
//                 onClickEdit={() => setSentEmail(false)}
//               />
//             </FormProvider>
//           )}
//           <ConnectMoreAuthDialog
//             open={showConnectMoreAuthDialog}
//             setOpen={setShowConnectMoreAuthDialog}
//           /> */}
//         </>
//       )}
//     </>
//   );
// }

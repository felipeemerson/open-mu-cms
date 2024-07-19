import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { BsFillEyeFill } from 'react-icons/bs';

import { AuthContext, AuthStateEnum } from '@/contexts/AuthContext';
import type { SignUpForm } from '@/api/types';
import { useCreateAccount } from '@/api/account';
import { useToast } from '@/contexts/ToastContext';
import useBaseTranslation from '@/hooks/use-base-translation';

import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import Typography from '@/components/Typography/Typography';
import FormInput from '@/components/FormInput/FormInput';
import Button from '@/components/Button/Button';
import Checkbox from '@/components/Checkbox/Checkbox';
import Alert, { AlertSeverityLevel } from '@/components/Alert/Alert';

type SignUpPageProps = Record<string, never>;

type ShowPasswordState = {
  showPassword: boolean;
  showConfirmPassword: boolean;
};

type SubmitError = {
  showError: boolean;
  message: string;
};

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useBaseTranslation('registration');
  const [show, setShow] = useState<ShowPasswordState>({
    showPassword: false,
    showConfirmPassword: false,
  });
  const [error, setError] = useState<SubmitError>({
    showError: false,
    message: '',
  });
  const [agreedWithTerms, setAgreedWithTerms] = useState(false);

  const createAccountMutation = useCreateAccount();
  const { openToast } = useToast();

  const { control, handleSubmit } = useForm<SignUpForm>({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      loginName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleShowPassword = () => {
    setShow({ ...show, showPassword: !show.showPassword });
  };

  const handleShowConfirmPassword = () => {
    setShow({ ...show, showConfirmPassword: !show.showConfirmPassword });
  };

  const onSubmit = (data: SignUpForm) => {
    createAccountMutation.mutate(data, {
      onSuccess: () => {
        openToast.success(t('registrationForm.successMessages.accountCreated'));
        navigate('/');
      },
      onError: (error: Error) => {
        const response = (error as AxiosError).response;
        if (response?.status === 400) {
          const responseMessage = JSON.stringify(
            (error as AxiosError).response?.data,
          );

          let errorMessage = responseMessage.includes(
            'Login name already exists',
          )
            ? t('registrationForm.errorMessages.accountAlreadyExists')
            : '';
          errorMessage += responseMessage.includes('Email already exists')
            ? ' ' + t('registrationForm.errorMessages.emailAlreadyExists')
            : '';

          setError({
            showError: true,
            message: errorMessage,
          });
        }
      },
    });
  };

  if (auth.state === AuthStateEnum.SIGNED_IN) {
    navigate('/');
  }

  return (
    <>
      <TitleWithDivider>{t('title')}</TitleWithDivider>
      <div className="flex w-full flex-col gap-4 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-800/20 md:p-12">
        <Typography
          variant="h3-inter"
          styles="text-primary-950 dark:text-primary-50"
        >
          {t('subtitle')}
        </Typography>
        <form
          className="flex w-fit flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            label={t('registrationForm.loginName')}
            name="loginName"
            control={control}
            fullWidth
            type="text"
            rules={{
              required: t('registrationForm.errorMessages.required'),
              minLength: {
                value: 3,
                message: t('registrationForm.errorMessages.minimumLength', {
                  minLength: 3,
                }),
              },
              maxLength: {
                value: 10,
                message: t('registrationForm.errorMessages.maximumLength', {
                  maxLength: 10,
                }),
              },
            }}
          />
          <FormInput
            label={t('registrationForm.email')}
            name="email"
            control={control}
            type="email"
            fullWidth
            rules={{
              required: t('registrationForm.errorMessages.required'),
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/i,
                message: t('registrationForm.errorMessages.invalidEmail'),
              },
            }}
          />
          <FormInput
            label={t('registrationForm.password')}
            name="password"
            control={control}
            fullWidth
            type={show.showPassword ? 'text' : 'password'}
            icon={
              <BsFillEyeFill onClick={handleShowPassword} className="size-6" />
            }
            rules={{
              required: t('registrationForm.errorMessages.required'),
              minLength: {
                value: 3,
                message: t('registrationForm.errorMessages.minimumLength', {
                  minLength: 3,
                }),
              },
              maxLength: {
                value: 20,
                message: t('registrationForm.errorMessages.maximumLength', {
                  maxLength: 20,
                }),
              },
            }}
          />
          <FormInput
            label={t('registrationForm.confirmPassword')}
            name="confirmPassword"
            control={control}
            fullWidth
            type={show.showConfirmPassword ? 'text' : 'password'}
            icon={
              <BsFillEyeFill
                onClick={handleShowConfirmPassword}
                className="size-6"
              />
            }
            rules={{
              required: t('registrationForm.errorMessages.required'),
              minLength: {
                value: 3,
                message: t('registrationForm.errorMessages.minimumLength', {
                  minLength: 3,
                }),
              },
              maxLength: {
                value: 20,
                message: t('registrationForm.errorMessages.maximumLength', {
                  maxLength: 20,
                }),
              },
              validate: {
                passwordShouldMatch: (_: any, values: SignUpForm) =>
                  values.password === values.confirmPassword ||
                  t('registrationForm.errorMessages.passwordShouldMatch'),
              },
            }}
          />
          <Checkbox
            label={t('registrationForm.agreeWithTerms')}
            checked={agreedWithTerms}
            onChange={() => setAgreedWithTerms(!agreedWithTerms)}
          />
          {error.showError && (
            <Alert
              severity={AlertSeverityLevel.ERROR}
              message={error.message}
              size="small"
            />
          )}
          <Button variant="bezel" type="submit" disabled={!agreedWithTerms}>
            {t('registrationForm.submitButton')}
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;

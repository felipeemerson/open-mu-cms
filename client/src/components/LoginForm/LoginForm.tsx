import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { BsFillEyeFill } from 'react-icons/bs';

import { AuthContext } from '@/contexts/AuthContext';
import type { LoginForm, LoginResponse } from '@/api/types';
import { useLogIn } from '@/api/account';
import useBaseTranslation from '@/hooks/use-base-translation';

import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import Alert, { AlertSeverityLevel } from '../Alert/Alert';

type LoginFormProps = {
  onSubmitSuccess?: () => void;
};
type SubmitError = {
  showError: boolean;
  message: string;
};

type ShowPasswordState = boolean;

const LoginForm: React.FC<LoginFormProps> = ({ onSubmitSuccess }) => {
  const { signIn } = useContext(AuthContext);
  const { t } = useBaseTranslation('sidebar.loginCard.form');
  const [showPassword, setShowPassword] = useState<ShowPasswordState>(false);
  const [error, setError] = useState<SubmitError>({
    showError: false,
    message: '',
  });

  const signInMutation = useLogIn();

  const { control, watch, handleSubmit } = useForm<LoginForm>({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      loginName: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginForm) => {
    signInMutation.mutate(data, {
      onSuccess: (data: LoginResponse) => {
        signIn(data.accessToken);
        onSubmitSuccess && onSubmitSuccess();
      },
      onError: (error: Error) => {
        const status = (error as AxiosError).response?.status;
        if (status === 400) {
          setError({
            showError: true,
            message: t('errorMessages.loginOrPasswordIncorrectly'),
          });
        } else {
          throw new Error();
        }
      },
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginName = watch('loginName');
  const password = watch('password');

  useEffect(() => {
    if (error.showError) {
      setError({ showError: false, message: '' });
    }
  }, [loginName, password]);

  return (
    <>
      <form
        className="flex flex-col justify-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          label={t('loginName')}
          name="loginName"
          control={control}
          fullWidth
          rules={{
            required: t('errorMessages.required'),
            minLength: {
              value: 3,
              message: t('errorMessages.minimumLength', { minLength: 3 }),
            },
            maxLength: {
              value: 10,
              message: t('errorMessages.maximumLength', { maxLength: 10 }),
            },
          }}
        />
        <FormInput
          label={t('password')}
          name="password"
          type={showPassword ? 'text' : 'password'}
          icon={
            <BsFillEyeFill onClick={handleShowPassword} className="size-6" />
          }
          control={control}
          fullWidth
          rules={{
            required: t('errorMessages.required'),
            minLength: {
              value: 3,
              message: t('errorMessages.minimumLength', { minLength: 3 }),
            },
            maxLength: {
              value: 20,
              message: t('errorMessages.maximumLength', { maxLength: 20 }),
            },
          }}
        />
        {error.showError && (
          <Alert
            severity={AlertSeverityLevel.ERROR}
            message={error.message}
            size="small"
          />
        )}
        <Typography
          component="button"
          variant="label2-s"
          styles="text-white rounded-md h-11 px-4 bg-gradient-to-l from-primary-200 to-primary-900 hover:bg-gradient-to-r"
          type="submit"
        >
          {t('submitButton')}
        </Typography>
        <Button
          variant="ghost2"
          styles="self-center"
          onClick={(e: React.MouseEvent) => e.preventDefault()}
        >
          {t('lostMyPassword')}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;

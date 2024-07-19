import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import { BsFillEyeFill } from 'react-icons/bs';

import type { ChangePasswordForm } from '@/api/types';
import { useChangePassword } from '@/api/account';
import { useToast } from '@/contexts/ToastContext';
import useBaseTranslation from '@/hooks/use-base-translation';

import FormInput from '@/components/FormInput/FormInput';
import Button from '@/components/Button/Button';
import Alert, { AlertSeverityLevel } from '@/components/Alert/Alert';

type ChangePasswordFormProps = {
  onClose: () => void;
};

type ShowPasswordState = {
  showCurrentPassword: boolean;
  showNextPassword: boolean;
  showConfirmNextPassword: boolean;
  [key: string]: any;
};

type SubmitError = {
  showError: boolean;
  message: string;
};

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onClose }) => {
  const [show, setShow] = useState<ShowPasswordState>({
    showCurrentPassword: false,
    showNextPassword: false,
    showConfirmNextPassword: false,
  });

  const [error, setError] = useState<SubmitError>({
    showError: false,
    message: '',
  });

  const changePasswordMutation = useChangePassword();
  const { openToast } = useToast();
  const { t } = useBaseTranslation('account.changePasswordModal.form');

  const { control, watch, handleSubmit } = useForm<ChangePasswordForm>({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      currentPassword: '',
      nextPassword: '',
      confirmNextPassword: '',
    },
  });

  const formFields: { label: string; name: keyof ChangePasswordForm }[] = [
    {
      label: t('currentPassword'),
      name: 'currentPassword',
    },
    {
      label: t('nextPassword'),
      name: 'nextPassword',
    },
  ];

  const onSubmit = (data: ChangePasswordForm) => {
    changePasswordMutation.mutate(data, {
      onSuccess: () => {
        onClose();
        openToast.success(t('successMessage'));
      },
      onError: (error: Error) => {
        if ((error as AxiosError).response?.status === 400) {
          setError({
            showError: true,
            message: t('errorMessages.currentPasswordWrong'),
          });
        }
      },
    });
  };

  const handleShowPassword = (name: string) => {
    setShow({ ...show, [name]: !show[name] });
  };

  const currentPassword = watch('currentPassword');

  useEffect(() => {
    if (error.showError) {
      setError({ showError: false, message: '' });
    }
  }, [currentPassword]);

  return (
    <>
      <form
        className="flex w-fit flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formFields.map((field, index) => (
          <FormInput
            key={index}
            label={field.label}
            name={field.name}
            control={control}
            fullWidth
            type={show[field.name] ? 'text' : 'password'}
            icon={
              <BsFillEyeFill
                onClick={() => handleShowPassword(field.name)}
                className="size-6"
              />
            }
            rules={{
              required: t('errorMessages.required'),
              minLength: {
                value: 3,
                message: t('errorMessages.minimumLength', {
                  minLength: 3,
                }),
              },
              maxLength: {
                value: 20,
                message: t('errorMessages.maximumLength', {
                  maxLength: 20,
                }),
              },
            }}
          />
        ))}

        <FormInput
          label={t('confirmNextPassword')}
          name="confirmNextPassword"
          control={control}
          fullWidth
          type={show.showConfirmNextPassword ? 'text' : 'password'}
          icon={
            <BsFillEyeFill
              onClick={() => handleShowPassword('showConfirmNextPassword')}
              className="size-6"
            />
          }
          rules={{
            required: t('errorMessages.required'),
            minLength: {
              value: 3,
              message: t('errorMessages.minimumLength', {
                minLength: 3,
              }),
            },
            maxLength: {
              value: 20,
              message: t('errorMessages.maximumLength', {
                maxLength: 20,
              }),
            },
            validate: {
              passwordShouldMatch: (_: any, values: ChangePasswordForm) =>
                values.nextPassword === values.confirmNextPassword ||
                t('errorMessages.passwordShouldMatch'),
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

        <Button variant="bezel" type="submit">
          {t('button')}
        </Button>
      </form>
    </>
  );
};

export default ChangePasswordForm;

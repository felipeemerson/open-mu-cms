import React from 'react';

import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { BiError } from 'react-icons/bi';

import Typography from '../Typography/Typography';

interface FormInputProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconDirection?: 'left' | 'right';
  rules?: Record<string, any>;
  styles?: string;
  [key: string]: any;
}

function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  placeholder,
  defaultValue,
  type,
  fullWidth = false,
  icon = undefined,
  iconDirection = 'right',
  rules = {},
  styles,
  ...props
}: FormInputProps<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { ...rules },
  });

  return (
    <>
      <label className={`flex flex-grow flex-col gap-1`}>
        <Typography
          variant="label3-m"
          styles="text-primary-950 dark:text-primary-50"
          component="span"
        >
          {label}
        </Typography>

        <div className="relative w-full">
          {icon && iconDirection === 'left' ? (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-primary-500 hover:text-primary-600">
              {icon}
            </div>
          ) : null}
          <input
            className={twMerge(
              `h-10 w-80 ${
                fullWidth && 'w-full'
              } rounded-[4px] border border-neutral-300 p-2 font-inter text-primary-950 focus:border-primary-500 focus:outline-none
                    focus:ring-1 focus:ring-primary-500 focus:invalid:border-red-500 focus:invalid:ring-red-500
                    dark:border-neutral-700 dark:bg-neutral-900 dark:text-primary-50
                    ${
                      invalid
                        ? 'text-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }
                    disabled:bg-primary-100 disabled:text-neutral-500 disabled:shadow-none disabled:placeholder:text-neutral-500
                    ${icon && iconDirection === 'left' ? 'pl-9' : 'pl-2'}
                    ${icon && iconDirection === 'right' ? 'pr-9' : 'pr-2'}`,
              styles,
            )}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
            {...field}
            {...props}
          />
          {icon && iconDirection === 'right' ? (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer text-primary-500 hover:text-primary-600">
              {icon}
            </div>
          ) : null}
        </div>
        <div className="flex gap-1">
          {invalid ? <BiError className="text-red-500" /> : null}
          <Typography
            variant="label4-r"
            styles={'text-red-500'}
            component="span"
          >
            {error?.message}
          </Typography>
        </div>
      </label>
    </>
  );
}

export default FormInput;

import React from 'react';
import { twMerge } from 'tailwind-merge';

import Typography from '../Typography/Typography';

type ButtonProps = {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'flat' | 'outline' | 'bezel' | 'ghost1' | 'ghost2';
  size?: 'medium' | 'large';
  active?: boolean;
  disabled?: boolean;
  iconDirection?: 'left' | 'right';
  fullWidth?: boolean;
  styles?: string;
  onClick?: (...args: any) => void;
  [key: string]: any;
};

const Button: React.FC<ButtonProps> = ({
  children,
  icon: Icon = undefined,
  iconDirection = 'left',
  variant = 'flat',
  size,
  disabled = false,
  fullWidth = false,
  styles = '',
  onClick,
  ...props
}) => {
  const buttonStyles = {
    flat: 'enabled:bg-primary-500 enabled:hover:bg-primary-600 enabled:active:bg-primary-700',
    outline: `border border-primary-500 enabled:hover:border-primary-700 enabled:active:border-primary-800
      dark:enabled:hover:border-primary-400 dark:enabled:active:border-primary-200
      dark: border-primary-300`,
    bezel: `enabled:bg-gradient-to-b enabled:from-primary-500 enabled:to-primary-600 enabled:hover:from-primary-600 enabled:hover:to-primary-600 enabled:active:from-primary-700 enabled:active:to-primary-700`,
    ghost1: '',
    ghost2: '',
  };

  const disabledStyles = {
    flat: 'disabled:bg-primary-100 dark:disabled:bg-primary-900 disabled:cursor-not-allowed',
    outline:
      'disabled:border-primary-200 dark:disabled:border-primary-800 disabled:cursor-not-allowed',
    bezel:
      'disabled:bg-primary-100 dark:disabled:bg-primary-900 disabled:cursor-not-allowed',
    ghost1: 'disabled:text-primary-300 disabled:cursor-not-allowed',
    ghost2: '',
  };

  const textStyles = {
    flat: 'enabled:text-neutral-100 disabled:text-primary-400',
    outline: `enabled:text-primary-500 enabled:hover:text-primary-700 enabled:active:text-primary-800 disabled:text-primary-200
       dark:enabled:text-primary-300 dark:enabled:hover:text-primary-400`,
    bezel: 'enabled:text-neutral-100 disabled:text-primary-400',
    ghost1:
      'text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 dark:text-primary-300',
    ghost2: 'text-primary-400 hover:text-primary-600',
  };

  return (
    <button
      className={twMerge(
        fullWidth ? 'flex-grow' : 'w-fit',
        'ap-1 flex items-center rounded-md px-4',
        size === 'large' ? 'h-9' : 'h-11',
        buttonStyles[variant],
        disabledStyles[variant],
        textStyles[variant],
        variant === 'ghost1' || variant === 'ghost2' ? 'h-fit px-0' : '',
        styles,
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && iconDirection === 'left' ? Icon : null}
      <Typography
        component="span"
        variant={
          variant === 'ghost2'
            ? 'label3-r'
            : size === 'large' || variant === 'ghost1'
            ? 'label2-s'
            : 'label3-s'
        }
      >
        {children}
      </Typography>
      {Icon && iconDirection === 'right' ? Icon : null}
    </button>
  );
};

export default Button;

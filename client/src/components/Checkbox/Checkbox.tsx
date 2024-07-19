import React from 'react';
import Typography from '../Typography/Typography';

import { colors } from '@/public/colors';

type CheckboxProps = {
  checked: boolean;
  label: string;
  [key: string]: any;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, label, ...props }) => {
  const isDarkMode = document.querySelector('html')?.classList.contains('dark');
  return (
    <>
      <label className="inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="size-4 border-8 border-primary-900 checked:bg-primary-900 dark:border-primary-300 dark:bg-primary-300"
          checked={checked}
          hidden
          {...props}
        />
        <span
          className={`flex size-[18px] items-center justify-center rounded-[4px]`}
        >
          {checked ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.11 18 18 17.1 18 16V2C18 0.9 17.11 0 16 0ZM7 14L2 9L3.41 7.59L7 11.17L14.59 3.58L16 5L7 14Z"
                fill={colors.primary[isDarkMode ? 300 : 900]}
              />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2V16H2V2H16ZM16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z"
                fill={colors.primary[isDarkMode ? 300 : 900]}
              />
            </svg>
          )}
        </span>
        <Typography
          variant="body2-r"
          styles="text-primary-950 dark:text-primary-50 ml-2"
        >
          {label}
        </Typography>
      </label>
    </>
  );
};

export default Checkbox;

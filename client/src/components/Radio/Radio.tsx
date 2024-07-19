import React, { useId } from 'react';

import Typography from '../Typography/Typography';

type RadioProps = {
  checked: boolean;
  label: string;
  [key: string]: any;
};

const Radio: React.FC<RadioProps> = ({ checked, label, ...props }) => {
  const inputId = useId();

  return (
    <>
      <div className="inline-flex items-center">
        <input
          type="checkbox"
          id={inputId}
          className="size-4"
          checked={checked}
          hidden
          {...props}
        />
        <label
          htmlFor={inputId}
          className={`flex size-[18px] cursor-pointer items-center justify-center rounded-full border-2 border-primary-900 dark:border-primary-300`}
        >
          {checked && (
            <div className="size-2 rounded-full bg-primary-900 dark:bg-primary-300" />
          )}
        </label>
        <Typography
          variant="body2-r"
          styles="text-primary-950 dark:text-primary-50 ml-2"
        >
          {label}
        </Typography>
      </div>
    </>
  );
};

export default Radio;

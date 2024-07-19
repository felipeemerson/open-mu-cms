import React from 'react';

import { MdWarning } from 'react-icons/md';
import { MdError } from 'react-icons/md';
import { MdInfo } from 'react-icons/md';
import { MdCheckCircle } from 'react-icons/md';
import { MdClose } from 'react-icons/md';

import Typography from '../Typography/Typography';
import { twMerge } from 'tailwind-merge';

export enum AlertSeverityLevel {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

type AlertProps = {
  severity: AlertSeverityLevel;
  message: string;
  onClose?: () => void;
  withClose?: boolean;
  styles?: string;
  size?: 'small' | 'large';
};

const Alert: React.FC<AlertProps> = ({
  severity,
  message,
  onClose,
  withClose = false,
  styles,
  size = 'large',
}) => {
  const containerStyles: Record<string, string> = {
    [AlertSeverityLevel.SUCCESS]: 'border-green-400 bg-green-200',
    [AlertSeverityLevel.ERROR]: 'border-red-400 bg-red-200',
    [AlertSeverityLevel.INFO]: 'border-blue-400 bg-blue-200',
    [AlertSeverityLevel.WARNING]: 'border-orange-400 bg-orange-200',
  };

  const textStyles: Record<string, string> = {
    [AlertSeverityLevel.SUCCESS]: 'text-green-600',
    [AlertSeverityLevel.ERROR]: 'text-red-600',
    [AlertSeverityLevel.INFO]: 'text-blue-600',
    [AlertSeverityLevel.WARNING]: 'text-orange-600',
  };

  const isLarge = size === 'large';
  const iconSize = isLarge ? 'size-6' : 'size-4';
  const closeSize = isLarge ? 'size-5' : 'size-4';
  return (
    <>
      <div
        className={twMerge(
          'flex max-w-72 items-center justify-between gap-4 outline-none md:max-w-2xl lg:max-w-4xl',
          isLarge ? 'p-4' : 'p-1',
          containerStyles[severity],
          styles,
        )}
      >
        <div className="flex items-center gap-2">
          {severity === AlertSeverityLevel.SUCCESS && (
            <MdCheckCircle className={`${iconSize} text-green-600`} />
          )}
          {severity === AlertSeverityLevel.ERROR && (
            <MdError className={`${iconSize} text-red-600`} />
          )}
          {severity === AlertSeverityLevel.WARNING && (
            <MdWarning className={`${iconSize} text-orange-600`} />
          )}
          {severity === AlertSeverityLevel.INFO && (
            <MdInfo className={`${iconSize} text-blue-600`} />
          )}
          <Typography
            variant={isLarge ? 'body1-m' : 'body3-m'}
            styles={textStyles[severity]}
          >
            {message}
          </Typography>
        </div>
        {withClose && (
          <button onClick={() => onClose && onClose()}>
            <MdClose className={`${closeSize} ${textStyles[severity]}`} />
          </button>
        )}
      </div>
    </>
  );
};

export default Alert;

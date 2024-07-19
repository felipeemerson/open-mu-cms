import React from 'react';
import { twMerge } from 'tailwind-merge';

type TypographyProps = {
  children: React.ReactNode;
  component?: React.ElementType;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  styles?: string;
  variant:
    | 'h1'
    | 'h2'
    | 'h2-inter'
    | 'h3'
    | 'h3-inter'
    | 'h4'
    | 'h5'
    | 'body1-r'
    | 'body1-m'
    | 'body2-r'
    | 'body2-m'
    | 'body3-r'
    | 'body3-m'
    | 'label1-r'
    | 'label1-b'
    | 'label2-r'
    | 'label2-s'
    | 'label3-m'
    | 'label3-r'
    | 'label3-s'
    | 'label4-r'
    | 'label4-s'
    | undefined;
  [key: string]: any;
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  component: Component = 'p',
  children,
  styles,
  onClick,
  ...props
}) => {
  const variantStyles = {
    h1: 'font-cinzel-decorative font-bold leading-[125%] text-[40px]',
    h2: 'font-cinzel-decorative font-bold leading-[125%] text-[24px] md:text-[32px]',
    'h2-inter':
      'font-inter font-bold leading-[125%] text-[24px] md:text-[32px]',
    h3: 'font-cinzel-decorative font-bold leading-[125%] text-[18px] md:text-[24px]',
    'h3-inter':
      'font-inter font-bold leading-[125%] text-[18px] md:text-[24px]',
    h4: 'font-cinzel-decorative font-bold leading-[125%] text-[14px] md:text-[18px]',
    h5: 'font-cinzel-decorative font-bold leading-[125%] text-[12px] md:text-[14px]',
    'body1-r':
      'font-inter font-normal leading-[150%] text-[12px] md:text-[16px]',
    'body1-m':
      'font-inter font-medium leading-[150%] text-[12px] md:text-[16px]',
    'body2-r': 'font-inter font-normal leading-[150%] text-[14px]',
    'body2-m': 'font-inter font-medium leading-[150%] text-[14px]',
    'body3-r': 'font-inter font-normal leading-[150%] text-[12px]',
    'body3-m': 'font-inter font-medium leading-[150%] text-[12px]',
    'label1-r': 'font-cinzel font-normal leading-[125%] text-[18px]',
    'label1-b': 'font-cinzel font-bold leading-[125%] text-[18px]',
    'label2-r':
      'font-inter font-normal leading-[125%] text-[12px] md:text-[16px]',
    'label2-s':
      'font-inter font-semibold leading-[125%] text-[12px] md:text-[16px]',
    'label3-m': 'font-inter font-medium leading-[125%] text-[14px]',
    'label3-r': 'font-inter font-normal leading-[125%] text-[14px]',
    'label3-s': 'font-inter font-semibold leading-[125%] text-[14px]',
    'label4-r': 'font-inter font-normal leading-[125%] text-[12px]',
    'label4-s': 'font-inter font-semibold leading-[125%] text-[12px]',
  };
  return (
    <Component
      onClick={onClick}
      className={twMerge(variantStyles[variant || 'body1-r'], styles)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Typography;

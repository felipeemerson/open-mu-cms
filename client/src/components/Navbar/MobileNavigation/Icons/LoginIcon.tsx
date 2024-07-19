import React from 'react';

import { colors } from '@/public/colors';

type LoginIconProps = {
  className?: string;
  onClick: () => void;
};

const LoginIcon: React.FC<LoginIconProps> = ({ className = '', onClick }) => {
  return (
    <>
      <svg
        className={className}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <g clipPath="url(#clip0_202_3429)">
          <path
            d="M14.6667 9.33333L12.8 11.2L16.2667 14.6667H2.66667V17.3333H16.2667L12.8 20.8L14.6667 22.6667L21.3333 16L14.6667 9.33333ZM26.6667 25.3333H16V28H26.6667C28.1333 28 29.3333 26.8 29.3333 25.3333V6.66667C29.3333 5.2 28.1333 4 26.6667 4H16V6.66667H26.6667V25.3333Z"
            fill="url(#paint0_linear_202_3429)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_202_3429"
            x1="2.66667"
            y1="16"
            x2="29.3333"
            y2="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={colors.primary[200]} />
            <stop offset="1" stopColor={colors.primary[600]} />
          </linearGradient>
          <clipPath id="clip0_202_3429">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default LoginIcon;

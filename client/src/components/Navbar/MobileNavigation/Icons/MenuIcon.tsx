import React from 'react';

import { colors } from '@/public/colors';

type MenuIconProps = {
  className?: string;
  onClick: () => void;
};

const MenuIcon: React.FC<MenuIconProps> = ({ className = '', onClick }) => {
  return (
    <>
      <svg
        className={className}
        menu-button="true"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
      >
        <g clipPath="url(#clip0_202_3424)">
          <path
            d="M4 24H28V21.3333H4V24ZM4 17.3333H28V14.6667H4V17.3333ZM4 8V10.6667H28V8H4Z"
            fill="url(#paint0_linear_202_3424)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_202_3424"
            x1="4"
            y1="16"
            x2="28"
            y2="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={colors.primary[200]} />
            <stop offset="1" stopColor={colors.primary[600]} />
          </linearGradient>
          <clipPath id="clip0_202_3424">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
export default MenuIcon;

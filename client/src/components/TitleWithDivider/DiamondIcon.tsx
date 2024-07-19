import React from 'react';
import { colors } from '@/public/colors';

type DiamondIconProps = Record<string, never>;

const DiamondIcon: React.FC<DiamondIconProps> = () => {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_105_145)">
        <path
          d="M4.44219 0.182813C4.19844 -0.0609375 3.80312 -0.0609375 3.55781 0.182813L0.182813 3.55781C-0.0609375 3.80156 -0.0609375 4.19687 0.182813 4.44219L3.55781 7.81719C3.80156 8.06094 4.19687 8.06094 4.44219 7.81719L7.81719 4.44219C8.06094 4.19844 8.06094 3.80312 7.81719 3.55781L4.44219 0.182813Z"
          fill="url(#paint0_linear_105_145)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_105_145"
          x1="21"
          y1="4"
          x2="0"
          y2="4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors.primary[200]} />
          <stop offset="1" stopColor={colors.primary[900]} />
        </linearGradient>
        <clipPath id="clip0_105_145">
          <rect width="8" height="8" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DiamondIcon;

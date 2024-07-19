import React from 'react';

type FacebookIconProps = Record<string, never>;

const FacebookIcon: React.FC<FacebookIconProps> = () => {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.6667 18.5H22L23.3333 13.1667H18.6667V10.5C18.6667 9.12669 18.6667 7.83335 21.3333 7.83335H23.3333V3.35335C22.8987 3.29602 21.2573 3.16669 19.524 3.16669C15.904 3.16669 13.3333 5.37602 13.3333 9.43335V13.1667H9.33334V18.5H13.3333V29.8334H18.6667V18.5Z"
        fill="#F4F3F8"
      />
    </svg>
  );
};

export default FacebookIcon;

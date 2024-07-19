import React from 'react';

type ImageButtonProps = {
  children: React.ReactNode;
  size?: 'large' | 'medium';
  link: string;
};

const ImageButton: React.FC<ImageButtonProps> = ({
  children,
  size = 'large',
  link,
}) => {
  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={`flex h-[125px] cursor-pointer items-center justify-center rounded-lg bg-primary-200 hover:bg-primary-300 dark:bg-primary-300 dark:hover:bg-primary-400
      ${size === 'large' ? 'w-[250px]' : 'w-48'} `}
      >
        <div className="flex max-h-[90px] max-w-[144px] items-center justify-center">
          {children}
        </div>
      </a>
    </>
  );
};

export default ImageButton;

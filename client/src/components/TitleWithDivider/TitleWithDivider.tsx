import React from 'react';

import Typography from '../Typography/Typography';
import DiamondIcon from './DiamondIcon';

type TitleWithDividerProps = {
  twoDividers?: boolean;
  children: React.ReactNode;
};

const TitleWithDivider: React.FC<TitleWithDividerProps> = ({
  twoDividers = false,
  children,
}) => {
  return (
    <div className="flex items-center gap-1">
      {twoDividers ? (
        <div className="flex flex-grow items-center">
          <DiamondIcon />
          <div className="h-px flex-grow bg-gradient-to-l from-primary-200 to-primary-900 dark:to-primary-400"></div>
        </div>
      ) : null}
      <Typography
        variant={twoDividers ? 'h3' : 'h2'}
        component="h1"
        styles="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-200 to-primary-900 dark:to-primary-400 bg-clip-text text-transparent"
      >
        {children}
      </Typography>
      <div className="flex flex-grow items-center">
        <div className="h-px flex-grow bg-gradient-to-r from-primary-200 to-primary-900 dark:to-primary-400"></div>
        <DiamondIcon />
      </div>
    </div>
  );
};

export default TitleWithDivider;

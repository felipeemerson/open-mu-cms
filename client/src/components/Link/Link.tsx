import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '../Typography/Typography';

type LinkProps = {
  children: React.ReactNode;
  to: string;
  underlined?: boolean;
  styles?: string;
};

const Link: React.FC<LinkProps> = ({
  children,
  to,
  underlined = true,
  styles,
}) => {
  return (
    <>
      <Typography
        variant="label2-r"
        component={RouterLink}
        to={to}
        styles={`text-primary-400 hover:text-primary-600 cursor-pointer ${
          underlined ? 'underline' : ''
        } ${styles}`}
      >
        {children}
      </Typography>
    </>
  );
};

export default Link;

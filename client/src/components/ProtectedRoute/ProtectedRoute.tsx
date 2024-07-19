import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext, AuthStateEnum } from '@/contexts/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (auth.state !== AuthStateEnum.SIGNED_IN) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

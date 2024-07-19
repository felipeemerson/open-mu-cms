import React, { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '@/contexts/AuthContext';
import { AccountState, type JWTPayload } from '@/api/types';

import NewsForm from '@/components/NewsForm/NewsForm';

type CreateNewsFormPage = Record<string, never>;

const CreateNewsForm: React.FC<CreateNewsFormPage> = () => {
  const { auth } = useContext(AuthContext);

  const jwtPayload: JWTPayload | undefined = auth.token
    ? jwtDecode(auth.token)
    : undefined;
  const hasPrivilege =
    (jwtPayload?.role || AccountState.NORMAL) === AccountState.GAME_MASTER;

  if (!hasPrivilege) return <Navigate to="/" />;

  return (
    <>
      <NewsForm isEditing={false} />
    </>
  );
};

export default CreateNewsForm;

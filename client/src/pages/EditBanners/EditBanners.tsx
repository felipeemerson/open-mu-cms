import React, { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '@/contexts/AuthContext';
import { AccountState, type JWTPayload } from '@/api/types';
import { useGetBanners } from '@/api/banners';

import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import BannersForm from './BannersForm';

type EditBannersPageProps = Record<string, never>;

const EditBannersPage: React.FC<EditBannersPageProps> = () => {
  const { auth } = useContext(AuthContext);
  const { t } = useTranslation();
  const jwtPayload: JWTPayload | undefined = auth.token
    ? jwtDecode(auth.token)
    : undefined;
  const hasPrivilege =
    (jwtPayload?.role || AccountState.NORMAL) === AccountState.GAME_MASTER;

  if (!hasPrivilege) return <Navigate to="/" />;

  const { data: banners, isLoading } = useGetBanners();

  return (
    <>
      <TitleWithDivider>{t('editBanners.title')}</TitleWithDivider>
      <div className="flex w-full flex-col gap-8 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-800/20 md:p-12">
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <BannersForm banners={banners || []} />
        )}
      </div>
    </>
  );
};

export default EditBannersPage;

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useQueryClient } from '@tanstack/react-query';

import { AuthContext } from '@/contexts/AuthContext';
import { AccountState, JWTPayload } from '@/api/types';
import useBaseTranslation from '@/hooks/use-base-translation';

import TitleWithDivider from '../TitleWithDivider/TitleWithDivider';
import Button from '../Button/Button';

type AccountCardProps = Record<string, never>;

const AccountCard: React.FC<AccountCardProps> = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useBaseTranslation('sidebar.accountCard');
  const { signOut, auth } = useContext(AuthContext);

  const jwtPayload: JWTPayload = jwtDecode(auth.token as string);

  return (
    <>
      <div className="flex min-w-80 flex-col gap-4 rounded-lg border border-primary-200 px-6 py-4 dark:border-primary-900 dark:bg-primary-800/20">
        <TitleWithDivider twoDividers>{t('title')}</TitleWithDivider>
        <Button
          variant="ghost1"
          styles="mx-auto"
          onClick={() => navigate('/my-account')}
        >
          {t('menuOptions.myAccount')}
        </Button>
        {jwtPayload.role === AccountState.GAME_MASTER && (
          <>
            <Button
              variant="ghost1"
              styles="mx-auto"
              onClick={() => navigate('/news/add')}
            >
              {t('menuOptions.addNews')}
            </Button>
            <Button
              variant="ghost1"
              styles="mx-auto"
              onClick={() => navigate('/banners')}
            >
              {t('menuOptions.banners')}
            </Button>
          </>
        )}
        <Button
          variant="ghost1"
          styles="mx-auto"
          onClick={() => {
            signOut();
            queryClient.resetQueries();
          }}
        >
          {t('menuOptions.logout')}
        </Button>
      </div>
    </>
  );
};

export default AccountCard;

import React from 'react';

import useBaseTranslation from '@/hooks/use-base-translation';

import TitleWithDivider from '../../TitleWithDivider/TitleWithDivider';
import LoginForm from '../../LoginForm/LoginForm';

type LoginCardProps = Record<string, never>;

const LoginCard: React.FC<LoginCardProps> = () => {
  const { t } = useBaseTranslation('sidebar.loginCard');
  return (
    <>
      <div className="flex min-w-80 flex-col gap-4 rounded-lg border border-primary-200 px-6 py-4 dark:border-primary-900 dark:bg-primary-800/20">
        <TitleWithDivider twoDividers>{t('title')}</TitleWithDivider>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginCard;

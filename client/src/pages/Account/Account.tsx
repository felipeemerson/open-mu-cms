import React, { useState } from 'react';

import { useGetAccount } from '@/api/account';
import useBaseTranslation from '@/hooks/use-base-translation';

import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import Typography from '@/components/Typography/Typography';
import Button from '@/components/Button/Button';
import CharactersTable from './CharactersTable';
import ChangePasswordModal from './ChangePasswordModal';

type AccountPageProps = Record<string, never>;

const AccountPage: React.FC<AccountPageProps> = () => {
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const { data: accountData, isLoading } = useGetAccount();
  const { t } = useBaseTranslation('account');

  const handleOpenChangePasswordModal = () => {
    setOpenChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false);
  };

  return (
    <>
      <TitleWithDivider>{t('title')}</TitleWithDivider>
      <div className="flex w-full flex-col gap-8 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-800/20 md:p-12">
        {!isLoading && (
          <>
            <Typography
              component="h2"
              variant="h2-inter"
              styles="text-primary-950 dark:text-primary-50"
            >
              {t('welcome')}, {accountData?.loginName}!
            </Typography>

            <div className="flex flex-col gap-4">
              <Typography
                component="h3"
                variant="h3-inter"
                styles="text-primary-950 dark:text-primary-50"
              >
                {t('data')}
              </Typography>
              {[
                { label: t('loginName'), value: accountData?.loginName },
                { label: t('email'), value: accountData?.email },
              ].map((item, index) => (
                <label
                  key={index}
                  className="flex flex-grow flex-col gap-1 md:w-80 md:flex-grow-0"
                >
                  <Typography
                    variant="label3-m"
                    styles="text-primary-950 dark:text-primary-50"
                    component="span"
                  >
                    {item.label}
                  </Typography>
                  <input
                    className="h-10 w-full rounded-[4px] border border-neutral-300 bg-primary-100 p-2 font-inter text-neutral-400 shadow-none placeholder:text-neutral-500 dark:border-neutral-700 dark:bg-primary-900"
                    type="text"
                    disabled
                    defaultValue={item.value}
                  />
                </label>
              ))}
              <Button variant="outline" onClick={handleOpenChangePasswordModal}>
                {t('changePasswordButton')}
              </Button>
            </div>
            <div className="flex max-w-[744px] flex-col gap-4">
              <Typography
                component="h3"
                variant="h3-inter"
                styles="text-primary-950 dark:text-primary-50"
              >
                {t('characters')}
              </Typography>
              <CharactersTable characters={accountData?.characters || []} />
            </div>
          </>
        )}
      </div>
      {openChangePasswordModal ? (
        <ChangePasswordModal onClose={handleCloseChangePasswordModal} />
      ) : null}
    </>
  );
};

export default AccountPage;

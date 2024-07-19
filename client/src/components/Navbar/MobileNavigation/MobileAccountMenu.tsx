import React, { useContext, useEffect, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { AuthContext } from '@/contexts/AuthContext';
import { AccountState, JWTPayload } from '@/api/types';

import useBaseTranslation from '@/hooks/use-base-translation';

import Typography from '../../Typography/Typography';

type MobileAccountMenuProps = {
  onClose: () => void;
  show: boolean;
};

const MobileAccountMenu: React.FC<MobileAccountMenuProps> = ({
  onClose,
  show,
}) => {
  const navigate = useNavigate();
  const { t } = useBaseTranslation('sidebar.accountCard.menuOptions');
  const { signOut, auth } = useContext(AuthContext);
  const mobileMenuRef = createRef<HTMLDivElement>();
  const jwtPayload: JWTPayload = jwtDecode(auth.token as string);

  const handleClickOutside = (event: MouseEvent) => {
    const modalElement = document.getElementById('mobile-account-menu');
    const targetElement = event.target as HTMLElement;

    if (!modalElement || !modalElement.contains(targetElement)) {
      if (!targetElement.closest('svg[account-button]')) {
        onClose();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {show ? (
        <div
          id="mobile-account-menu"
          className={`absolute right-0 top-11 z-[1] flex w-36 origin-right transform flex-col gap-2
                      rounded-l-lg bg-white py-2 text-center transition-all dark:bg-primary-950
                      ${show ? 'animate-scale-x' : 'animate-scale-x-out'}`}
          ref={mobileMenuRef}
        >
          <ul className="flex flex-col gap-1">
            <li>
              <Typography
                component="button"
                variant="label2-r"
                styles="text-[14px] text-primary-500 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                onClick={() => {
                  navigate('/my-account');
                  onClose();
                }}
              >
                {t('myAccount')}
              </Typography>
            </li>
            {jwtPayload.role === AccountState.GAME_MASTER && (
              <>
                <li>
                  <Typography
                    component="button"
                    variant="label2-r"
                    styles="text-[14px] text-primary-500 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                    onClick={() => {
                      navigate('/news/add');
                      onClose();
                    }}
                  >
                    {t('addNews')}
                  </Typography>
                </li>
                <li>
                  <Typography
                    component="button"
                    variant="label2-r"
                    styles="text-[14px] text-primary-500 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                    onClick={() => {
                      navigate('/banners');
                      onClose();
                    }}
                  >
                    {t('banners')}
                  </Typography>
                </li>
              </>
            )}
            <li>
              <Typography
                component="button"
                variant="label2-r"
                styles="text-[14px] text-primary-500 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                onClick={(event: React.MouseEvent) => {
                  event.stopPropagation();
                  signOut();
                  onClose();
                }}
              >
                {t('logout')}
              </Typography>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default MobileAccountMenu;

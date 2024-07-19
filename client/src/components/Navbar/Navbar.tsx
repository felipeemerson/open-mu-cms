import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaUserCircle } from 'react-icons/fa';

import { AuthContext, AuthStateEnum } from '@/contexts/AuthContext';
import useBaseTranslation from '@/hooks/use-base-translation';
import { colors } from '@/public/colors';

import MenuIcon from './MobileNavigation/Icons/MenuIcon';
import LoginIcon from './MobileNavigation/Icons/LoginIcon';
import MobileNavMenu from './MobileNavigation/MobileNavMenu';
import MobileAccountMenu from './MobileNavigation/MobileAccountMenu';
import MobileLoginDialog from './MobileNavigation/MobileLoginDialog';
import SelectLanguage from './SelectLanguage';
import SelectTheme from './SelectTheme';

type NavbarProps = Record<string, never>;

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const { t } = useBaseTranslation('navigation');
  const { auth } = useContext(AuthContext);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const navButtons = [
    {
      label: t('home'),
      to: '/',
    },
    {
      label: t('registration'),
      to: '/sign-up',
    },
    {
      label: t('downloads'),
      to: '/downloads',
    },
    {
      label: t('news'),
      to: '/news',
    },
    {
      label: t('rankings'),
      to: '/rankings',
    },
    {
      label: t('about'),
      to: '/about',
    },
  ];

  if (auth.state === AuthStateEnum.SIGNED_IN) {
    navButtons.splice(1, 1);
  }

  const handleClickMenu = () => {
    setShowMobileNav(!showMobileNav);
  };

  const handleClickAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  return (
    <>
      <div className="m-auto flex max-w-[1328px] bg-primary-200 dark:bg-primary-800/20 md:bg-inherit">
        <nav className="m-auto w-full p-2 md:p-0 md:pb-2">
          <ul
            role="navigation"
            className="flex justify-between lg:justify-center lg:gap-8"
          >
            {navButtons.map((navButton, index) => (
              <li
                key={index}
                tabIndex={0}
                onClick={() => navigate(navButton.to)}
                className="hidden h-11 cursor-pointer justify-center bg-gradient-to-t from-primary-200 to-primary-600 bg-clip-text p-4 font-cinzel text-[16px] font-bold leading-[125%] text-transparent hover:text-primary-600 dark:to-primary-400 dark:hover:text-primary-400 md:flex lg:text-[18px]"
              >
                {navButton.label}
              </li>
            ))}

            <MenuIcon className="md:hidden" onClick={handleClickMenu} />

            {auth.state === AuthStateEnum.SIGNED_IN ? (
              <div>
                <svg width="0" height="0" account-button="true">
                  <linearGradient
                    id="gradient"
                    x1="100%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                  >
                    <stop stopColor={colors.primary[600]} offset="0%" />
                    <stop stopColor={colors.primary[200]} offset="100%" />
                  </linearGradient>
                </svg>
                <FaUserCircle
                  style={{ fill: 'url(#gradient)' }}
                  className="size-8 md:hidden"
                  onClick={handleClickAccountMenu}
                  account-button="true"
                />
              </div>
            ) : (
              <LoginIcon
                className="md:hidden"
                onClick={() => setOpenLoginDialog(true)}
              />
            )}
          </ul>
        </nav>
        <div className="mr-4 hidden gap-4 md:flex">
          <SelectTheme />
          <SelectLanguage />
        </div>
      </div>
      <div className="m-auto h-[1px] max-w-[1328px] bg-gradient-to-r from-primary-200 via-primary-600 to-primary-200" />
      <MobileNavMenu
        navButtons={navButtons}
        show={showMobileNav}
        onClose={() => setShowMobileNav(false)}
      />

      {showAccountMenu && (
        <MobileAccountMenu
          show={showAccountMenu}
          onClose={() => setShowAccountMenu(false)}
        />
      )}
      {openLoginDialog && auth.state !== AuthStateEnum.SIGNED_IN && (
        <MobileLoginDialog onClose={() => setOpenLoginDialog(false)} />
      )}
    </>
  );
};

export default Navbar;

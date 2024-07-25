import React, { createRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Typography from '../../Typography/Typography';

import brazilFlag from '@/assets/images/flags/brazil.ico';
import unitedStatesFlag from '@/assets/images/flags/united_states.ico';
import SelectTheme from '../SelectTheme';

type MobileNavMenuProps = {
  onClose: () => void;
  show: boolean;
  navButtons: {
    label: string;
    to: string;
  }[];
};

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({
  show,
  navButtons,
  onClose,
}) => {
  const navigate = useNavigate();
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  const mobileMenuRef = createRef<HTMLDivElement>();

  const handleClickOutside = (event: MouseEvent) => {
    const modalElement = document.getElementById('mobile-nav-popup-menu');
    const targetElement = event.target as HTMLElement;

    if (!modalElement || !modalElement.contains(targetElement)) {
      if (!targetElement.closest('svg[menu-button]')) {
        onClose();
      }
    }
  };

  const onChangeLangague = (newLanguage: string) => {
    if (language !== newLanguage) {
      localStorage.setItem('language', newLanguage);
      changeLanguage(newLanguage);
    }

    onClose();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {show ? (
        <div
          id="mobile-nav-popup-menu"
          className={`absolute top-10 z-[1] flex w-36 origin-left transform flex-col gap-2
                    rounded-r-lg bg-white py-2 text-center transition-all dark:bg-primary-950
                    ${show ? 'animate-scale-x' : 'animate-scale-x-out'}`}
          ref={mobileMenuRef}
        >
          <ul className="flex flex-col gap-1">
            {navButtons.map((navButton, index) => (
              <Typography
                key={index}
                component="li"
                variant="label2-r"
                styles="text-[14px] text-primary-500 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                onClick={() => {
                  onClose();
                  navigate(navButton.to);
                }}
              >
                {navButton.label}
              </Typography>
            ))}
          </ul>
          <hr className="mx-2 h-[1px] bg-primary-200 dark:bg-primary-800" />
          <div className="flex justify-center gap-2">
            <button
              className="size-6 hover:brightness-90 hover:filter dark:hover:brightness-110"
              onClick={() => onChangeLangague('pt')}
            >
              <img src={brazilFlag} />
            </button>
            <button className="size-6" onClick={() => onChangeLangague('en')}>
              <img src={unitedStatesFlag} />
            </button>
          </div>
          <SelectTheme onChangeTheme={onClose} />
        </div>
      ) : null}
    </>
  );
};

export default MobileNavMenu;

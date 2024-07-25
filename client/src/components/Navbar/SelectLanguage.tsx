import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import brazilFlag from '@/assets/images/flags/brazil.ico';
import unitedStatesFlag from '@/assets/images/flags/united_states.ico';

type SelectLanguageProps = Record<string, never>;

const SelectLanguage: React.FC<SelectLanguageProps> = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [openMenu, setOpenMenu] = useState(false);

  const onChangeLangague = (newLanguage: string) => {
    if (language !== newLanguage) {
      localStorage.setItem('language', newLanguage);
      changeLanguage(newLanguage);
    }

    setOpenMenu(false);
  };

  return (
    <>
      <div className="relative hidden size-8 cursor-pointer self-center md:block">
        <img
          className="hover:brightness-90 hover:filter dark:hover:brightness-110"
          src={language === 'pt' ? brazilFlag : unitedStatesFlag}
          onClick={() => setOpenMenu(!openMenu)}
        />
        {openMenu && (
          <menu
            className={`absolute right-0 z-[1] flex origin-top transform flex-col gap-1
                      rounded-b-lg py-2 text-center transition-all
                      ${openMenu ? 'animate-scale-y' : 'animate-scale-y-out'}`}
          >
            <button className="size-8">
              <img
                className="hover:brightness-90 hover:filter dark:hover:brightness-110"
                src={brazilFlag}
                onClick={() => onChangeLangague('pt')}
              />
            </button>
            <button className="size-8">
              <img
                className="hover:brightness-90 hover:filter dark:hover:brightness-110"
                src={unitedStatesFlag}
                onClick={() => onChangeLangague('en')}
              />
            </button>
          </menu>
        )}
      </div>
    </>
  );
};

export default SelectLanguage;

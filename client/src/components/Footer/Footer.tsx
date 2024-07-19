import React from 'react';

import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import Typography from '../Typography/Typography';
import YoutubeIcon from './FooterIcons/YoutubeIcon';
import DiscordIcon from './FooterIcons/DiscordIcon';
import FacebookIcon from './FooterIcons/FacebookIcon';
import InstagramIcon from './FooterIcons/InstagramIcon';

type FooterProps = Record<string, never>;

const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation();

  return (
    <>
      <footer className="m-auto mt-16 flex max-w-[1328px] flex-col-reverse items-center gap-6 rounded-t-lg bg-primary-50 px-14 py-12 dark:border-x dark:border-t dark:border-primary-900 dark:bg-primary-800/20 md:flex-row md:justify-between md:py-12">
        <div className="flex h-28 flex-col items-center text-primary-950 dark:text-primary-50 md:justify-between">
          <Typography component="h1" variant="h2">
            Mu Online
          </Typography>
          <Typography variant="label2-r" styles="text-center">
            {t('footer.copyright1')} <br></br> {t('footer.copyright2')}
          </Typography>
          <span className="flex gap-1 font-inter text-[12px] text-primary-950 dark:text-primary-50">
            {t('footer.developedBy')}
            <a
              className="flex items-center gap-1 hover:text-primary-800 dark:hover:text-primary-200"
              href="https://github.com/felipeemerson"
              target="_blank"
            >
              <FaGithub className="size-3" /> felipeemerson
            </a>
          </span>
        </div>
        <div className="flex place-items-center gap-6">
          <div className="h-fit cursor-pointer rounded-md bg-primary-500 p-1.5 text-white hover:bg-primary-600 dark:hover:bg-primary-400">
            <DiscordIcon />
          </div>
          <div className="h-fit cursor-pointer rounded-md bg-primary-500 p-1.5 text-white hover:bg-primary-600 dark:hover:bg-primary-400">
            <YoutubeIcon />
          </div>
          <div className="h-fit cursor-pointer rounded-md bg-primary-500 p-1.5 text-white hover:bg-primary-600 dark:hover:bg-primary-400">
            <FacebookIcon />
          </div>
          <div className="h-fit cursor-pointer rounded-md bg-primary-500 p-1.5 text-white hover:bg-primary-600 dark:hover:bg-primary-400">
            <InstagramIcon />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

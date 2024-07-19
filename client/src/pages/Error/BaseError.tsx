import React from 'react';

import useBaseTranslation from '@/hooks/use-base-translation';

import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import Typography from '@/components/Typography/Typography';
import Link from '@/components/Link/Link';

import errorImg from '@/assets/images/error-img.png';

type BaseErrorProps = {
  errorCode: string;
  title: string;
  subtitle: string;
  showHomeLink?: boolean;
};

const BaseErrorPage: React.FC<BaseErrorProps> = ({
  errorCode,
  title,
  subtitle,
  showHomeLink = false,
}) => {
  const { t } = useBaseTranslation('error');
  return (
    <>
      <TitleWithDivider>{t('title')}</TitleWithDivider>
      <div className="flex w-full flex-col-reverse gap-2 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-800/20 md:flex-row md:gap-8 md:p-12">
        <div className="flex flex-grow flex-col gap-4 text-center">
          <h2 className="font-cinzel-decorative text-[64px] font-bold leading-[125%] text-primary-500">
            {errorCode}
          </h2>
          <Typography
            component="h3"
            variant="h2-inter"
            styles="text-primary-950 dark:text-primary-50"
          >
            {title}
          </Typography>
          <Typography variant="body1-r" styles="dark:text-primary-50">
            {subtitle}
          </Typography>
          {showHomeLink && (
            <Link underlined={false} to="/">
              {t('homeButton')}
            </Link>
          )}
        </div>
        <img src={errorImg} className="max-w-48 self-center md:max-w-80" />
      </div>
    </>
  );
};

export default BaseErrorPage;

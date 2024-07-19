import React from 'react';

import useBaseTranslation from '@/hooks/use-base-translation';

import BaseErrorPage from './BaseError';

type Error404Props = Record<string, never>;

const Error404Page: React.FC<Error404Props> = () => {
  const { t } = useBaseTranslation('error404');
  return (
    <>
      <BaseErrorPage
        errorCode="404"
        title={t('title')}
        subtitle={t('subtitle')}
        showHomeLink
      />
    </>
  );
};

export default Error404Page;

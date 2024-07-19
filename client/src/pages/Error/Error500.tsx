import React from 'react';

import useBaseTranslation from '@/hooks/use-base-translation';

import BaseErrorPage from './BaseError';

type Error500Props = Record<string, never>;

const Error500Page: React.FC<Error500Props> = () => {
  const { t } = useBaseTranslation('error500');
  return (
    <>
      <BaseErrorPage
        errorCode="500"
        title={t('title')}
        subtitle={t('subtitle')}
      />
    </>
  );
};

export default Error500Page;

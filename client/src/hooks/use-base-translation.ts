import { useTranslation } from 'react-i18next';

const useBaseTranslation = (basePath: string) => {
  const { t } = useTranslation();
  return {
    t: (key: string, options?: Record<string, any>) =>
      t(`${basePath}.${key}`, options),
  };
};

export default useBaseTranslation;

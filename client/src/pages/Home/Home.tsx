import React from 'react';
import { useTranslation } from 'react-i18next';

import { useGetBanners } from '@/api/banners';
import { Banner } from '@/api/types';

import ImageSlider from '@/components/ImageSlider/ImageSlider';
import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import EventCard from './EventCard/EventCard';
import Typography from '@/components/Typography/Typography';
import NewsCardList from './NewsCard/NewsCardList';

type HomePageProps = Record<string, never>;

const HomePage: React.FC<HomePageProps> = () => {
  const { t } = useTranslation();
  const { data: banners, isLoading } = useGetBanners();
  return (
    <>
      {isLoading ? (
        <div className="h-[200px] animate-pulse rounded-lg bg-primary-200 dark:bg-primary-800/20 md:h-[300px]" />
      ) : (
        (banners as Banner[]).length > 0 && (
          <ImageSlider banners={banners as Banner[]} />
        )
      )}
      <TitleWithDivider>{t('home.newsTitle')}</TitleWithDivider>
      <NewsCardList />
      <TitleWithDivider>{t('home.eventsTitle')}</TitleWithDivider>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <EventCard />
        <div className="flex h-96 w-full items-center justify-center rounded-lg border border-primary-200 bg-primary-50 dark:border-primary-900 dark:bg-primary-800/20 desktop:min-h-full">
          <Typography
            variant="h2"
            component="h3"
            styles="text-primary-950 dark:text-primary-50"
          >
            {t('home.soonTitleCard')}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default HomePage;

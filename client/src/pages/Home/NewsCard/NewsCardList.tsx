import React from 'react';

import { SortDirection } from '@/api/types';
import { useGetAllNews } from '@/api/news';
import { useTranslation } from 'react-i18next';

import NewsCard from './NewsCard';
import NewsCardSkeleton from './NewsCardSkeleton';
import Typography from '@/components/Typography/Typography';

type NewsCardListProps = Record<string, never>;

const NewsCardList: React.FC<NewsCardListProps> = () => {
  const { data: newsData, isLoading } = useGetAllNews(1, 2, SortDirection.DESC);
  const { t } = useTranslation();

  const newsList = newsData?.content || [];

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        {isLoading ? (
          <>
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </>
        ) : newsList.length === 0 ? (
          <Typography
            variant="h3-inter"
            styles="text-primary-950 dark:text-primary-50"
          >
            {t('home.newsEmptyMessage')}
          </Typography>
        ) : (
          newsList.map((news) => <NewsCard key={news.id} news={news} />)
        )}
      </div>
    </>
  );
};

export default NewsCardList;

import React, { useEffect, useState } from 'react';
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { LoaderData } from '@/types/react-router-dom';

import { useGetAllNews } from '@/api/news';
import { type News, SortDirection } from '@/api/types';
import { useTranslation } from 'react-i18next';

import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import NewsItem from './NewsItem';
import Pagination from '@/components/Pagination/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import Typography from '@/components/Typography/Typography';

type NewsPageProps = Record<string, never>;

export const loader = (async ({ request }: LoaderFunctionArgs) => {
  const typedRequest = request as unknown as Request;
  const url = new URL(typedRequest.url);
  const pageParam = url.searchParams.get('page') || '1';

  const isPageANumber = !Number.isNaN(pageParam);
  const isValidPage = isPageANumber && parseInt(pageParam) > 0;
  let page = 1;

  if (isValidPage) {
    page = parseInt(pageParam);
  }

  return {
    page,
  };
}) satisfies LoaderFunction;

const NewsPage: React.FC<NewsPageProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { page } = useLoaderData() as LoaderData<typeof loader>;
  const pageSize = 10;

  const { data: newsData, isLoading } = useGetAllNews(
    page,
    pageSize,
    SortDirection.DESC,
  );

  const [newsList, setNewsList] = useState<News[]>([]);

  const onPageChange = (nextPage: number) => {
    navigate(`/news?page=${nextPage}`);
  };

  const onDeleteNews = (newsId: string) => {
    setNewsList(newsList.filter((news) => news.id !== newsId));
  };

  useEffect(() => {
    if (!isLoading) {
      setNewsList(newsData?.content as News[]);
    }
  }, [isLoading, newsData?.content]);

  return (
    <>
      <TitleWithDivider>{t('news.title')}</TitleWithDivider>

      {isLoading ? (
        <div className="flex h-80 items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : newsList.length === 0 ? (
        <Typography
          variant="h3-inter"
          styles="text-primary-950 dark:text-primary-50"
        >
          {t('news.newsEmptyMessage')}
        </Typography>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-6">
            {newsList.map((news) => (
              <NewsItem key={news.id} news={news} onDeleteNews={onDeleteNews} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={Math.max(newsData?.totalPages || 1, page)}
            onPageChange={onPageChange}
            styles="self-end"
          />
        </div>
      )}
    </>
  );
};

export default NewsPage;

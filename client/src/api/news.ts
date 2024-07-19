import { useMutation, useQuery } from '@tanstack/react-query';
import api from './api';

import type { News, NewsForm, NewsPage } from './types';
import { SortDirection } from './types';

const createNews = async (news: NewsForm): Promise<News> => {
  const response = await api.post('/news', news);
  return response.data;
};

const updateNews = async (news: News): Promise<News> => {
  const response = await api.patch(`/news/${news.id}`, news);
  return response.data;
};

const getAllNews = async (
  page: number,
  size: number,
  sortDirection: SortDirection,
): Promise<NewsPage> => {
  const response = await api.get(
    `/news?page=${page - 1}&size=${size}&sortDirection=${sortDirection}`,
  );
  return response.data;
};

const getNewsById = async (newsId: string): Promise<News> => {
  const response = await api.get(`/news/${newsId}`);
  return response.data;
};

const deleteNews = async (newsId: string) => {
  const response = await api.delete(`/news/${newsId}`);
  return response.data;
};

export const useCreateNews = () => {
  return useMutation({
    mutationFn: (newsData: NewsForm) => createNews(newsData),
  });
};

export const useUpdateNews = () => {
  return useMutation({
    mutationFn: (newsData: News) => updateNews(newsData),
  });
};

export const useGetAllNews = (
  page: number,
  size: number,
  sortDirection: SortDirection,
) => {
  return useQuery<NewsPage, Error>({
    queryKey: ['news', page, size, sortDirection],
    queryFn: () => getAllNews(page, size, sortDirection),
  });
};

export const useGetNewsById = (newsId: string) => {
  return useQuery<News, Error>({
    queryKey: ['news', newsId],
    queryFn: () => getNewsById(newsId),
  });
};

export const useDeleteNews = () => {
  return useMutation({
    mutationFn: (newsId: string) => deleteNews(newsId),
  });
};

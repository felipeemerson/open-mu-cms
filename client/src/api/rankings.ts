import api from './api';
import { useQuery } from '@tanstack/react-query';

import type { GuildsRankingPage, PlayersRankingPage } from './types';

const getPlayersRanking = async (
  page: number,
  size: number,
  filteredClasses: string,
): Promise<PlayersRankingPage> => {
  const response = await api.get(
    `/characters/rank?page=${page}&size=${size}&filterClasses=${filteredClasses}`,
  );
  return response.data;
};

const getGuildsRanking = async (
  page: number,
  size: number,
): Promise<GuildsRankingPage> => {
  const response = await api.get(`/guilds/rank?page=${page}&size=${size}`);
  return response.data;
};

export const useGetPlayersRanking = (
  page: number,
  size: number,
  filteredClasses: string[],
) => {
  const filteredClassesStr = filteredClasses.join(',');
  return useQuery<PlayersRankingPage, Error>({
    queryKey: ['characters', 'rank', page, size, filteredClassesStr],
    queryFn: () => getPlayersRanking(page, size, filteredClassesStr),
  });
};

export const useGetGuildsRanking = (page: number, size: number) => {
  return useQuery<GuildsRankingPage, Error>({
    queryKey: ['guilds', 'rank', page, size],
    queryFn: () => getGuildsRanking(page, size),
  });
};

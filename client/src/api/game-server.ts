import api from './api';
import { useQuery } from '@tanstack/react-query';

import type { AccountCharacter, ServerStatistics } from './types';

const getServerStatistics = async (): Promise<ServerStatistics> => {
  const response = await api.get('/game/statistics');
  return response.data;
};

const getOnlinePlayers = async (): Promise<AccountCharacter[]> => {
  const response = await api.get('/game/onlines');
  return response.data;
};

export const useGetServerStatistics = () => {
  return useQuery<ServerStatistics, Error>({
    queryKey: ['game', 'statistics'],
    queryFn: () => getServerStatistics(),
  });
};

export const useGetOnlinePlayers = () => {
  return useQuery<AccountCharacter[], Error>({
    queryKey: ['game', 'onlines'],
    queryFn: () => getOnlinePlayers(),
  });
};

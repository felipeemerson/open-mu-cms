import api from './api';
import { useQuery } from '@tanstack/react-query';

import type { Guild } from './types';

const getGuild = async (name: string): Promise<Guild> => {
  const response = await api.get(`/guilds/${name}`);
  return response.data;
};

export const useGetGuild = (name: string) => {
  return useQuery<Guild, Error>({
    queryKey: ['guilds', name],
    queryFn: () => getGuild(name),
  });
};

import api from './api';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Banner } from './types';

const getBanners = async (): Promise<Banner[]> => {
  const response = await api.get('/banners');
  return response.data;
};

const changeBanners = async (banners: Banner[]): Promise<Banner[]> => {
  const response = await api.post('/banners', banners);
  return response.data;
};

export const useGetBanners = () => {
  return useQuery<Banner[], Error>({
    queryKey: ['banners'],
    queryFn: () => getBanners(),
  });
};

export const useChangeBanners = () => {
  return useMutation({
    mutationFn: (banners: Banner[]) => changeBanners(banners),
  });
};

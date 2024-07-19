import { useMutation, useQuery } from '@tanstack/react-query';
import api from './api';

import type { CharacterAttributes, CharacterDetails } from './types';

const getCharacter = async (
  characterName: string,
): Promise<CharacterDetails> => {
  const response = await api.get(`/characters/${characterName}`);
  return response.data;
};

const addAttributes = async (
  characterName: string,
  attributes: CharacterAttributes,
): Promise<CharacterDetails> => {
  const response = await api.patch(
    `/characters/${characterName}/attributes`,
    attributes,
  );
  return response.data;
};

const resetCharacter = async (
  characterName: string,
): Promise<CharacterDetails> => {
  const response = await api.patch(`/characters/${characterName}/reset`);
  return response.data;
};

export const useGetCharacter = (characterName: string) => {
  return useQuery<CharacterDetails, Error>({
    queryKey: ['characters', characterName],
    queryFn: () => getCharacter(characterName),
  });
};

export const useAddAttributes = () => {
  return useMutation({
    mutationFn: ({
      characterName,
      attributes,
    }: {
      characterName: string;
      attributes: CharacterAttributes;
    }) => addAttributes(characterName, attributes),
  });
};

export const useResetCharacter = () => {
  return useMutation({
    mutationFn: resetCharacter,
  });
};

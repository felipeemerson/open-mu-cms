import React, { useState } from 'react';

import { CharacterClass, mapCharacterClassToGroup } from '@/api/types';

type CharacterAvatarProps = {
  characterClassName: CharacterClass;
};

const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  characterClassName,
}) => {
  const [imageSrc, setImageSrc] = useState('');
  import(
    `../../assets/images/avatars/${mapCharacterClassToGroup(
      characterClassName,
    )}.png`
  ).then((img) => setImageSrc(img.default));

  return (
    <>
      <img className="size-20 rounded-full bg-neutral-100" src={imageSrc} />
    </>
  );
};

export default CharacterAvatar;

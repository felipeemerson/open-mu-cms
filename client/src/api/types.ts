export type LoginForm = {
  loginName: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type SignUpForm = {
  loginName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ChangePasswordForm = {
  currentPassword: string;
  nextPassword: string;
  confirmNextPassword: string;
};

export enum AccountState {
  NORMAL = 'NORMAL',
  GAME_MASTER = 'GAME_MASTER',
  SPECTATOR = 'SPECTATOR',
  GAME_MASTER_INVISIBLE = 'GAME_MASTER_INVISIBLE',
  BANNED = 'BANNED',
  TEMPORARILY_BANNED = 'TEMPORARILY_BANNED',
}

export enum CharacterStatus {
  NORMAL = 'NORMAL',
  BANNED = 'BANNED',
  GAME_MASTER = 'GAME_MASTER',
}

type BaseCharacter = {
  characterId: string;
  characterName: string;
  characterClassName: CharacterClass;
  resets: number;
  level: number;
  masterLevel: number | null;
  status: CharacterStatus;
};

export type AccountCharacter = BaseCharacter & {
  online: boolean;
  [key: string]: any;
};

export type Account = {
  id: string;
  loginName: string;
  email: string;
  registrationDate: string;
  state: AccountState;
  vaultPassword: string;
  chatBanUntil: string | null;
  characters: AccountCharacter[];
  vaultExtended: boolean;
};

export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Page<T> = {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type PlayersRankingPage = Page<AccountCharacter>;

export type GuildRank = {
  id: string;
  name: string;
  logo: string;
  score: number;
  guildMaster: string;
  members: number;
  [key: string]: any;
};

export type GuildsRankingPage = Page<GuildRank>;

export enum GuildPosition {
  GUILD_MASTER = 'GUILD_MASTER',
  NORMAL = 'NORMAL',
  BATTLE_MASTER = 'BATTLE_MASTER',
  UNDEFINE = 'UNDEFINE',
}

type BaseGuild = {
  id: string;
  name: string;
  hostilityGuild: string | null;
  allianceGuild: string | null;
  logo: string;
  score: number;
  notice: string | null;
};

export type Guild = BaseGuild & {
  guildMaster: string;
  members: (AccountCharacter & { guildPosition: GuildPosition })[];
  [key: string]: any;
};

export enum HeroState {
  NEW = 'NEW',
  HERO = 'HERO',
  LIGHT_HERO = 'LIGHT_HERO',
  NORMAL = 'NORMAL',
  PLAYER_KILL_WARNING = 'PLAYER_KILL_WARNING',
  PLAYER_KILL_STAGE_1 = 'PLAYER_KILL_STAGE_1',
  PLAYER_KILL_STAGE_2 = 'PLAYER_KILL_STAGE_2',
}

export type CharacterAttributes = {
  strength: number;
  agility: number;
  vitality: number;
  energy: number;
  command: number;
};

export type CharacterDetails = BaseCharacter & {
  levelUpPoints: number;
  masterLevelUpPoints: number;
  currentMap: {
    mapName: string;
    positionX: number;
    positionY: number;
  };
  playerKillCount: number;
  state: HeroState;
  attributes: CharacterAttributes;
  guild: BaseGuild;
};

export enum CharacterClass {
  DARK_KNIGHT = 'Dark Knight',
  BLADE_KNIGHT = 'Blade Knight',
  BLADE_MASTER = 'Blade Master',
  DARK_WIZARD = 'Dark Wizard',
  SOUL_MASTER = 'Soul Master',
  GRAND_MASTER = 'Grand Master',
  FAIRY_ELF = 'Fairy Elf',
  MUSE_ELF = 'Muse Elf',
  HIGH_ELF = 'High Elf',
  MAGIC_GLADIATOR = 'Magic Gladiator',
  DUEL_MASTER = 'Duel Master',
  DARK_LORD = 'Dark Lord',
  LORD_EMPEROR = 'Lord Emperor',
  RAGE_FIGHTER = 'Rage Fighter',
  FIST_MASTER = 'Fist Master',
  SUMMONER = 'Summoner',
  BLOODY_SUMMONER = 'Bloody Summoner',
  DIMENSION_MASTER = 'Dimension Master',
}

export const CHARACTER_CLASSES_GROUP = {
  bm: [
    CharacterClass.DARK_KNIGHT,
    CharacterClass.BLADE_KNIGHT,
    CharacterClass.BLADE_MASTER,
  ],
  sm: [
    CharacterClass.DARK_WIZARD,
    CharacterClass.SOUL_MASTER,
    CharacterClass.GRAND_MASTER,
  ],
  elf: [
    CharacterClass.FAIRY_ELF,
    CharacterClass.MUSE_ELF,
    CharacterClass.HIGH_ELF,
  ],
  mg: [CharacterClass.MAGIC_GLADIATOR, CharacterClass.DUEL_MASTER],
  dl: [CharacterClass.DARK_LORD, CharacterClass.LORD_EMPEROR],
  rf: [CharacterClass.RAGE_FIGHTER, CharacterClass.FIST_MASTER],
  sum: [
    CharacterClass.SUMMONER,
    CharacterClass.BLOODY_SUMMONER,
    CharacterClass.DIMENSION_MASTER,
  ],
};

export const mapCharacterClassToGroup = (
  characterClass: CharacterClass,
): string => {
  if (CHARACTER_CLASSES_GROUP.bm.includes(characterClass)) {
    return 'bm';
  } else if (CHARACTER_CLASSES_GROUP.sm.includes(characterClass)) {
    return 'sm';
  } else if (CHARACTER_CLASSES_GROUP.elf.includes(characterClass)) {
    return 'elf';
  } else if (CHARACTER_CLASSES_GROUP.dl.includes(characterClass)) {
    return 'dl';
  } else if (CHARACTER_CLASSES_GROUP.mg.includes(characterClass)) {
    return 'mg';
  } else if (CHARACTER_CLASSES_GROUP.rf.includes(characterClass)) {
    return 'rf';
  } else {
    return 'sum';
  }
};

export type ServerStatistics = {
  accounts: number;
  characters: number;
  guilds: number;
  onlines: number;
};

export type JWTPayload = {
  sub: string;
  role: AccountState;
  exp: number;
  iat: number;
};

export type NewsForm = {
  title: string;
  content: string;
  authorName: string;
};

export type News = {
  id: string;
  authorName: string;
  category: string | null;
  title: string;
  content: string;
  creationDate: number;
  lastUpdatedDate: number | null;
};

export type NewsPage = Page<News>;

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type Banner = {
  id: string | null;
  imageUrl: string;
  hasLink: boolean;
  isExternalLink: boolean | null;
  link: string | null;
  orderIndex: number;
};

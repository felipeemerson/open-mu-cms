import React, { useState } from 'react';

import useBaseTranslation from '@/hooks/use-base-translation';

import TitleWithDivider from '../../../TitleWithDivider/TitleWithDivider';
import Tabs from '../../../Tabs/Tabs';
import PlayersRankTable from './PlayersRankTable';
import GuildsRankTable from './GuildsRankTable';
import Link from '../../../Link/Link';

type RankingsCardProps = Record<string, never>;

type CurrentTabState = number;

const RankingsCard: React.FC<RankingsCardProps> = () => {
  const [currentTab, setCurrentTab] = useState<CurrentTabState>(0);
  const { t } = useBaseTranslation('sidebar.rankingsCard');

  const handleChangeTab = (currentTab: CurrentTabState) => {
    setCurrentTab(currentTab);
  };

  const isPlayersActive = currentTab === 0;
  const isGuildsActive = currentTab === 1;

  return (
    <>
      <div className="flex min-w-80 flex-col gap-4 rounded-lg border border-primary-200 px-6 py-4 dark:border-primary-900 dark:bg-primary-800/20">
        <TitleWithDivider twoDividers>{t('title')}</TitleWithDivider>
        <Tabs
          tabs={[t('playersTab'), t('guildsTab')]}
          activeTab={currentTab}
          onChangeTab={handleChangeTab}
          styles="self-center"
        />
        {isPlayersActive ? <PlayersRankTable /> : null}
        {isGuildsActive ? <GuildsRankTable /> : null}
        <Link
          to={`/rankings?rank=${isPlayersActive ? 'players' : 'guilds'}`}
          underlined={false}
          styles="self-end"
        >
          {t('button')}
        </Link>
      </div>
    </>
  );
};

export default RankingsCard;

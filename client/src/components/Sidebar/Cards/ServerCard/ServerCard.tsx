import React from 'react';

import { useGetServerStatistics } from '@/api/game-server';

import List from '../../../List/List';
import TitleWithDivider from '../../../TitleWithDivider/TitleWithDivider';
import Link from '../../../Link/Link';
import ServerCardSkeleton from './ServerCardSkeleton';
import OnlineCircle from '../../../OnlineCircle/OnlineCircle';
import useBaseTranslation from '@/hooks/use-base-translation';

type ServerCardProps = Record<string, never>;

const ServerCard: React.FC<ServerCardProps> = () => {
  const { data: statisticsData, isLoading } = useGetServerStatistics();

  const { t } = useBaseTranslation('sidebar.serverCard');

  return (
    <>
      <div className="flex min-w-80 flex-col gap-4 rounded-lg border border-primary-200 px-6 py-4 dark:border-primary-900 dark:bg-primary-800/20">
        <TitleWithDivider twoDividers>{t('title')}</TitleWithDivider>
        {isLoading ? (
          <ServerCardSkeleton />
        ) : (
          <List>
            <List.Item label={t('version')} value="Season 6 Ep. 3" />
            <List.Item label={t('experience')} value="1000x" />
            <List.Item label={t('masterExperience')} value="50x" />
            <List.Item label={t('drops')} value="50%" />
            <List.Item label={t('accounts')} value={statisticsData?.accounts} />
            <List.Item label={t('guilds')} value={statisticsData?.guilds} />
            <List.Item
              label={t('playersOn')}
              value={
                <div className="flex place-items-center gap-1">
                  <Link to="/onlines">{statisticsData?.onlines}</Link>
                  <OnlineCircle isOnline />
                </div>
              }
            />
          </List>
        )}
      </div>
    </>
  );
};

export default ServerCard;

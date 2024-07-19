import React from 'react';

import { useGetServerStatistics } from '@/api/game-server';
import useBaseTranslation from '@/hooks/use-base-translation';

import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import Typography from '@/components/Typography/Typography';
import List from '@/components/List/List';
import Link from '@/components/Link/Link';
import OnlineCircle from '@/components/OnlineCircle/OnlineCircle';

type AboutPageProps = Record<string, never>;

const AboutPage: React.FC<AboutPageProps> = () => {
  const { data: statisticsData, isLoading } = useGetServerStatistics();
  const { t } = useBaseTranslation('about');

  return (
    <>
      <TitleWithDivider>{t('title')}</TitleWithDivider>
      <div className="flex w-full flex-col gap-8 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-800/20 md:p-12">
        {!isLoading && (
          <>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex w-full flex-col gap-4">
                <Typography
                  component="h2"
                  variant="h3-inter"
                  styles="text-primary-950 dark:text-primary-50"
                >
                  {t('serverSettings.title')}
                </Typography>
                <List>
                  <List.Item
                    label={t('serverSettings.version')}
                    value="Season 6 Ep. 3"
                  />
                  <List.Item
                    label={t('serverSettings.experience')}
                    value="1000x"
                  />
                  <List.Item
                    label={t('serverSettings.masterExperience')}
                    value="50x"
                  />
                  <List.Item label={t('serverSettings.drops')} value="50%" />
                  <List.Item
                    label={t('serverSettings.pointsPerLevel')}
                    value="5/7"
                  />
                  <List.Item
                    label={t('serverSettings.maxPoints')}
                    value="65535"
                  />
                </List>
              </div>
              <div className="flex w-full flex-col gap-4">
                <Typography
                  component="h2"
                  variant="h3-inter"
                  styles="text-primary-950 dark:text-primary-50"
                >
                  {t('resetSystem.title')}
                </Typography>
                <List>
                  <List.Item
                    label={t('resetSystem.resetTypeLabel')}
                    value={t('resetSystem.resetTypeValue')}
                  />
                  <List.Item label={t('resetSystem.command')} value="/reset" />
                  <List.Item
                    label={t('resetSystem.pointsPerReset')}
                    value="200"
                  />
                  <List.Item label={t('resetSystem.level')} value="400" />
                  <List.Item
                    label={t('resetSystem.postResetLevel')}
                    value="10"
                  />
                  <List.Item label="Zen" value="1" />
                </List>
              </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex w-full flex-col gap-4">
                <Typography
                  component="h2"
                  variant="h3-inter"
                  styles="text-primary-950 dark:text-primary-50"
                >
                  {t('commands.title')}
                </Typography>
                <List>
                  <List.Item
                    label={t('commands.str.label')}
                    value={t('commands.str.value')}
                  />
                  <List.Item
                    label={t('commands.agi.label')}
                    value={t('commands.agi.value')}
                  />
                  <List.Item
                    label={t('commands.vit.label')}
                    value={t('commands.vit.value')}
                  />
                  <List.Item
                    label={t('commands.ene.label')}
                    value={t('commands.ene.value')}
                  />
                  <List.Item
                    label={t('commands.cmd.label')}
                    value={t('commands.cmd.value')}
                  />
                  <List.Item
                    label={t('commands.moveMap.label')}
                    value={t('commands.moveMap.value')}
                  />
                </List>
              </div>
              <div className="flex w-full flex-col gap-4">
                <Typography
                  component="h2"
                  variant="h3-inter"
                  styles="text-primary-950 dark:text-primary-50"
                >
                  {t('serverStatistics.title')}
                </Typography>
                <List>
                  <List.Item
                    label={t('serverStatistics.accounts')}
                    value={statisticsData?.accounts}
                  />
                  <List.Item
                    label={t('serverStatistics.characters')}
                    value={statisticsData?.characters}
                  />
                  <List.Item
                    label={t('serverStatistics.guilds')}
                    value={statisticsData?.guilds}
                  />
                  <List.Item
                    label={t('serverStatistics.playersOn')}
                    value={
                      <div className="flex place-items-center gap-1">
                        <Link to="/onlines">{statisticsData?.onlines}</Link>
                        <OnlineCircle isOnline />
                      </div>
                    }
                  />
                </List>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AboutPage;

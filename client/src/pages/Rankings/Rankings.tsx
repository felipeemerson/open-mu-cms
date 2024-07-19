import React from 'react';
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { LoaderData } from '@/types/react-router-dom';

import { CHARACTER_CLASSES_GROUP } from '@/api/types';
import { useTranslation } from 'react-i18next';

import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import Tabs from '@/components/Tabs/Tabs';
import PlayersRankingTable from './PlayersRankingTable';
import GuildsRankingTable from './GuildsRankingTable';

type RankingsPageProps = Record<string, never>;

export const loader = (async ({ request }: LoaderFunctionArgs) => {
  const typedRequest = request as unknown as Request;
  const url = new URL(typedRequest.url);
  const rankParam = url.searchParams.get('rank') || 'players';
  const pageParam = url.searchParams.get('page') || '1';
  const filterClassesParam = url.searchParams.get('filterClasses') || '';

  const isPageANumber = !Number.isNaN(pageParam);
  const isValidPage = isPageANumber && parseInt(pageParam) > 0;
  let page = 1;

  const isValidRank = Object.keys(RankingsTab).includes(
    rankParam.toUpperCase(),
  );

  const rank = isValidRank ? rankParam : 'players';

  if (isValidPage) {
    page = parseInt(pageParam);
  }

  const isValidFilterClasses = Object.keys(CHARACTER_CLASSES_GROUP).includes(
    filterClassesParam,
  );

  return {
    rank,
    page,
    filterClasses: isValidFilterClasses ? filterClassesParam : '',
  };
}) satisfies LoaderFunction;

enum RankingsTab {
  PLAYERS,
  GUILDS,
}

const RankingsPage: React.FC<RankingsPageProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { rank, page, filterClasses } = useLoaderData() as LoaderData<
    typeof loader
  >;
  const rankTab = rank === 'players' ? RankingsTab.PLAYERS : RankingsTab.GUILDS;

  const handleChangeTab = (nextTab: RankingsTab) => {
    navigate(
      `/rankings?rank=${
        nextTab === RankingsTab.PLAYERS ? 'players' : 'guilds'
      }&page=1`,
    );
  };

  return (
    <>
      <TitleWithDivider>{t('rankings.title')}</TitleWithDivider>
      <div className="flex w-full flex-col gap-8 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-800/20 md:p-12">
        <Tabs
          tabs={[t('rankings.playersTab'), t('rankings.guildsTab')]}
          activeTab={rankTab}
          onChangeTab={handleChangeTab}
          styles="w-fit"
        />
        {rankTab === RankingsTab.PLAYERS ? (
          <>
            <PlayersRankingTable
              filteredClasses={filterClasses}
              currentPage={page}
            />
          </>
        ) : null}
        {rankTab === RankingsTab.GUILDS ? (
          <GuildsRankingTable currentPage={page} />
        ) : null}
      </div>
    </>
  );
};

export default RankingsPage;

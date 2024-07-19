import React from 'react';

import { useGetGuildsRanking } from '@/api/rankings';
import useBaseTranslation from '@/hooks/use-base-translation';

import Table from '../../../Table/Table';
import Typography from '../../../Typography/Typography';
import Link from '../../../Link/Link';
import GuildLogo from '../../../GuildLogo/GuildLogo';
import RankingsCardSkeleton from './RankingsCardSkeleton';
import TableEmptyMessage from '../../../Table/TableEmptyMessage/TableEmptyMessage';

import rank1 from '@/assets/images/rankings/1.png';
import rank2 from '@/assets/images/rankings/2.png';
import rank3 from '@/assets/images/rankings/3.png';

type GuildsRankTableProps = Record<string, never>;

const GuildsRankTable: React.FC<GuildsRankTableProps> = () => {
  const { data: rankData, isLoading } = useGetGuildsRanking(0, 10);
  const { t } = useBaseTranslation('sidebar.rankingsCard.guildsTableColumns');
  const columns = [
    {
      label: t('name'),
      name: 'name',
    },
    {
      label: t('score'),
      name: 'score',
    },
    {
      label: t('logo'),
      name: 'logo',
    },
  ];

  const rankMap: { [key: number]: string } = {
    0: rank1,
    1: rank2,
    2: rank3,
  };

  return (
    <>
      <Table columns={columns} withIndex>
        {isLoading ? (
          <RankingsCardSkeleton />
        ) : rankData?.content.length === 0 ? (
          <TableEmptyMessage message={t('emptyMessage')} type="card" />
        ) : (
          rankData?.content.map((row, index) => (
            <tr
              key={index}
              className={`border-b ${
                rankData?.content.length != index + 1
                  ? 'border-neutral-300 dark:border-primary-400'
                  : 'border-primary-950 dark:border-primary-50'
              }`}
            >
              {index < 3 ? (
                <td align="center">
                  <img
                    src={rankMap[index]}
                    className={`mx-auto ${index === 0 ? 'size-8' : 'size-6'}`}
                  />
                </td>
              ) : (
                <Typography
                  component="th"
                  variant="label3-s"
                  styles="text-primary-950 dark:text-primary-50"
                >
                  {index + 1}
                </Typography>
              )}

              <td className="text-center">
                <Link
                  to={`/guilds/${row.name}`}
                  styles="text-[14px] md:text-[14px]"
                >
                  {row.name}
                </Link>
              </td>
              <Typography
                component="td"
                variant="label3-r"
                styles="text-primary-950 dark:text-primary-50 text-center"
              >
                {row.score}
              </Typography>

              <td align="center">
                <GuildLogo base64Logo={row.logo} size={24} />
              </td>
            </tr>
          ))
        )}
      </Table>
    </>
  );
};

export default GuildsRankTable;

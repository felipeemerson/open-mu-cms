import React from 'react';

import { useGetPlayersRanking } from '@/api/rankings';
import useBaseTranslation from '@/hooks/use-base-translation';

import Table from '../../../Table/Table';
import Typography from '../../../Typography/Typography';
import RankingsCardSkeleton from './RankingsCardSkeleton';
import TableEmptyMessage from '../../../Table/TableEmptyMessage/TableEmptyMessage';

import rank1 from '@/assets/images/rankings/1.png';
import rank2 from '@/assets/images/rankings/2.png';
import rank3 from '@/assets/images/rankings/3.png';

type PlayersRankTableProps = Record<string, never>;

const PlayersRankTable: React.FC<PlayersRankTableProps> = () => {
  const { data: rankData, isLoading } = useGetPlayersRanking(0, 10, []);
  const { t } = useBaseTranslation('sidebar.rankingsCard.playersTableColumns');

  const columns = [
    {
      label: t('characterName'),
      name: 'characterName',
    },
    {
      label: t('level'),
      name: 'level',
    },
    {
      label: t('resets'),
      name: 'resets',
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
              {columns.map((column, colIndex) => (
                <Typography
                  component="td"
                  key={colIndex}
                  variant="label3-r"
                  styles="text-primary-950 dark:text-primary-50 text-center"
                >
                  {row[column.name]}
                </Typography>
              ))}
            </tr>
          ))
        )}
      </Table>
    </>
  );
};

export default PlayersRankTable;

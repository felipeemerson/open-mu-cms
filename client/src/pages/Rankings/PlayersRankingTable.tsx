import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetPlayersRanking } from '@/api/rankings';
import { CHARACTER_CLASSES_GROUP } from '@/api/types';
import useBaseTranslation from '@/hooks/use-base-translation';

import Table from '@/components/Table/Table';
import Typography from '@/components/Typography/Typography';
import Pagination from '@/components/Pagination/Pagination';
import Select, { type Option } from '@/components/Select/Select';
import LoadingTableBody from '../../components/Table/LoadingTableBody';
import TableEmptyMessage from '@/components/Table/TableEmptyMessage/TableEmptyMessage';
import OnlineCircle from '@/components/OnlineCircle/OnlineCircle';

import rank1 from '@/assets/images/rankings/1.png';
import rank2 from '@/assets/images/rankings/2.png';
import rank3 from '@/assets/images/rankings/3.png';

type PlayersRankingTableProps = {
  filteredClasses: string;
  currentPage: number;
};

const PlayersRankingTable: React.FC<PlayersRankingTableProps> = ({
  filteredClasses,
  currentPage,
}) => {
  const navigate = useNavigate();
  const { t } = useBaseTranslation('rankings.playersTable');
  const pageSize = 10;

  const classes: { [key: string]: any } = {
    '': [],
    ...CHARACTER_CLASSES_GROUP,
  };

  const { data: rankData, isLoading } = useGetPlayersRanking(
    currentPage - 1,
    pageSize,
    classes[filteredClasses],
  );

  const columns = [
    {
      label: t('name'),
      name: 'characterName',
    },
    {
      label: t('class'),
      name: 'characterClassName',
    },
    {
      label: t('level'),
      name: 'level',
    },
    {
      label: t('resets'),
      name: 'resets',
    },
    {
      label: t('online'),
      name: 'online',
    },
  ];

  const selectOptions: Option[] = [
    { value: '', label: t('all') },
    { value: 'bm', label: 'DK/BK/BM' },
    { value: 'sm', label: 'DW/SM/GM' },
    { value: 'elf', label: 'FE/ME/HE' },
    { value: 'mg', label: 'MG/DM' },
    { value: 'dl', label: 'DL/LE' },
    { value: 'rf', label: 'RF/FM' },
    { value: 'sum', label: 'SUM/BS/DM' },
  ];

  const rankMap: { [key: number]: any } = {
    1: rank1,
    2: rank2,
    3: rank3,
  };

  const onPageChange = (nextPage: number) => {
    navigate(
      `/rankings?rank=players&filterClasses=${filteredClasses}&page=${nextPage}`,
    );
  };

  const onSelectChange = (nextValue: string) => {
    navigate(`/rankings?rank=players&filterClasses=${nextValue}&page=1`);
  };

  return (
    <>
      <Select
        name="filterClasses"
        label={t('filterClass')}
        value={filteredClasses}
        onSelect={(v) => onSelectChange(v)}
        options={selectOptions}
      />
      <div className="flex flex-col gap-2">
        <Table columns={columns} withIndex>
          {isLoading ? (
            <LoadingTableBody />
          ) : rankData?.content.length === 0 ? (
            <TableEmptyMessage message={t('emptyMessage')} type="page" />
          ) : (
            rankData?.content.map((row, index) => {
              const currentPosition = index + 1 + (currentPage - 1) * pageSize;

              return (
                <tr
                  key={index}
                  className={`border-b ${
                    rankData?.content.length != index + 1
                      ? 'border-neutral-300 dark:border-primary-400'
                      : 'border-primary-950 dark:border-primary-50'
                  }`}
                >
                  {currentPosition <= 3 ? (
                    <td align="center">
                      <img
                        src={rankMap[currentPosition]}
                        className={`mx-auto ${
                          currentPosition === 1 ? 'size-8' : 'size-6'
                        }`}
                      />
                    </td>
                  ) : (
                    <Typography
                      component="th"
                      variant="label2-s"
                      styles="text-primary-950 dark:text-primary-50"
                    >
                      {currentPosition}
                    </Typography>
                  )}
                  {columns.slice(0, 4).map((column, colIndex) => (
                    <Typography
                      component="td"
                      key={colIndex}
                      variant="label2-r"
                      styles="text-primary-950 dark:text-primary-50 text-center"
                    >
                      {row[column.name]}
                    </Typography>
                  ))}
                  <td align="center">
                    <OnlineCircle isOnline={row.online} />
                  </td>
                </tr>
              );
            })
          )}
        </Table>
        <Pagination
          styles="self-end"
          onPageChange={onPageChange}
          currentPage={currentPage}
          totalPages={Math.max(rankData?.totalPages || 1, currentPage)}
        />
      </div>
    </>
  );
};

export default PlayersRankingTable;

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetGuildsRanking } from '@/api/rankings';
import useBaseTranslation from '@/hooks/use-base-translation';

import rank1 from '@/assets/images/rankings/1.png';
import rank2 from '@/assets/images/rankings/2.png';
import rank3 from '@/assets/images/rankings/3.png';

import Table from '@/components/Table/Table';
import Typography from '@/components/Typography/Typography';
import Link from '@/components/Link/Link';
import Pagination from '@/components/Pagination/Pagination';
import GuildLogo from '@/components/GuildLogo/GuildLogo';
import LoadingTableBody from '../../components/Table/LoadingTableBody';
import TableEmptyMessage from '@/components/Table/TableEmptyMessage/TableEmptyMessage';

type GuildsRankingTableProps = { currentPage: number };

const GuildsRankingTable: React.FC<GuildsRankingTableProps> = ({
  currentPage,
}) => {
  const navigate = useNavigate();
  const { t } = useBaseTranslation('rankings.guildsTableColumns');
  const pageSize = 10;
  const { data: rankData, isLoading } = useGetGuildsRanking(
    currentPage - 1,
    pageSize,
  );

  const columns = [
    {
      label: t('name'),
      name: 'name',
    },
    {
      label: t('logo'),
      name: 'logo',
    },
    {
      label: t('score'),
      name: 'score',
    },
    {
      label: t('guildMaster'),
      name: 'guildMaster',
    },
    {
      label: t('members'),
      name: 'members',
    },
  ];

  const rankMap: { [key: number]: any } = {
    1: rank1,
    2: rank2,
    3: rank3,
  };

  const onPageChange = (nextPage: number) => {
    navigate(`/rankings?rank=guilds&page=${nextPage}`);
  };

  return (
    <>
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
                    rankData.content.length != index + 1
                      ? 'border-neutral-300 dark:border-primary-400'
                      : 'border-primary-950 dark:border-primary-50'
                  }`}
                >
                  {currentPosition <= 3 ? (
                    <td align="center">
                      <img
                        src={rankMap[currentPosition]}
                        className={`mx-auto self-center ${
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

                  <td className="text-center">
                    <Link to={`/guilds/${row.name}`}>{row.name}</Link>
                  </td>

                  <td align="center">
                    <GuildLogo base64Logo={row.logo} size={32} />
                  </td>
                  {columns.slice(2).map((column, colIndex) => (
                    <Typography
                      component="td"
                      key={colIndex}
                      variant="label2-r"
                      styles="text-primary-950 dark:text-primary-50 text-center"
                    >
                      {row[column.name]}
                    </Typography>
                  ))}
                </tr>
              );
            })
          )}
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.max(rankData?.totalPages || 1, currentPage)}
          onPageChange={onPageChange}
          styles="self-end"
        />
      </div>
    </>
  );
};

export default GuildsRankingTable;

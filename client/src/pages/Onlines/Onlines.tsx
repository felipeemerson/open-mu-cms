import React from 'react';
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { LoaderData } from '@/types/react-router-dom';

import { CharacterStatus } from '@/api/types';
import { useGetOnlinePlayers } from '@/api/game-server';
import useBaseTranslation from '@/hooks/use-base-translation';

import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import Typography from '@/components/Typography/Typography';
import Table from '@/components/Table/Table';
import Pagination from '@/components/Pagination/Pagination';
import LoadingTableBody from '@/components/Table/LoadingTableBody';
import TableEmptyMessage from '@/components/Table/TableEmptyMessage/TableEmptyMessage';

type OnlinesPageProps = Record<string, never>;

export const loader = (async ({ request }: LoaderFunctionArgs) => {
  const typedRequest = request as unknown as Request;
  const url = new URL(typedRequest.url);
  const pageParam = url.searchParams.get('page');

  return { page: pageParam ? parseInt(pageParam) : 1 };
}) satisfies LoaderFunction;

const OnlinesPage: React.FC<OnlinesPageProps> = () => {
  const navigate = useNavigate();
  const { t } = useBaseTranslation('onlines');
  const { data, isLoading } = useGetOnlinePlayers();
  const playersData = data || [];
  const { page } = useLoaderData() as LoaderData<typeof loader>;
  const pageSize = 5;
  const totalPages = Math.ceil(playersData.length / pageSize);

  const columns = [
    {
      label: t('table.name'),
      name: 'characterName',
    },
    {
      label: t('table.class'),
      name: 'characterClassName',
    },
    {
      label: t('table.level'),
      name: 'level',
    },
    {
      label: t('table.resets'),
      name: 'resets',
    },
  ];

  const onPageChange = (nextPage: number) => {
    navigate('/onlines?page=' + nextPage);
  };

  return (
    <>
      <TitleWithDivider>{t('title')}</TitleWithDivider>
      <div className="flex w-full flex-col gap-8 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-800/20 md:p-12">
        <Typography
          variant="h3-inter"
          component="h2"
          styles="text-primary-950 dark:text-primary-50"
        >
          {playersData.length} {t('playersOn')}
        </Typography>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-[4px] bg-blue-800 dark:bg-blue-200" />
            <Typography
              variant="body2-r"
              component="span"
              styles="text-primary-950 dark:text-primary-50"
            >
              {t('staff')}
            </Typography>
          </div>
          <Table columns={columns} withIndex>
            {isLoading ? (
              <LoadingTableBody />
            ) : playersData.length === 0 ? (
              <TableEmptyMessage message={t('emptyMessage')} type="page" />
            ) : (
              playersData
                .slice((page - 1) * pageSize, page * pageSize)
                .map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      playersData.length != index + 1
                        ? 'border-neutral-300 dark:border-primary-400'
                        : 'border-primary-950 dark:border-primary-50'
                    }`}
                  >
                    <Typography
                      component="th"
                      variant="label2-s"
                      styles="text-primary-950 dark:text-primary-50"
                    >
                      {index + 1 + (page - 1) * pageSize}
                    </Typography>
                    <Typography
                      component="th"
                      styles={
                        row.status == CharacterStatus.GAME_MASTER
                          ? 'text-blue-800 dark:text-blue-200'
                          : 'text-primary-950 dark:text-primary-50'
                      }
                      variant={
                        row.status == CharacterStatus.GAME_MASTER
                          ? 'label2-s'
                          : 'label2-r'
                      }
                    >
                      {row.characterName}
                    </Typography>
                    {columns.slice(1, 4).map((column, colIndex) => (
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
                ))
            )}
          </Table>
          <Pagination
            styles="self-end"
            onPageChange={onPageChange}
            currentPage={page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default OnlinesPage;

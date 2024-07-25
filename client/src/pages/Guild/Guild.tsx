import React from 'react';
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { LoaderData } from '@/types/react-router-dom';

import { FaChevronLeft } from 'react-icons/fa';

import { useGetGuild } from '@/api/guilds';
import { GuildPosition } from '@/api/types';
import useBaseTranslation from '@/hooks/use-base-translation';

import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import Button from '@/components/Button/Button';
import Typography from '@/components/Typography/Typography';
import Table from '@/components/Table/Table';
import GuildLogo from '@/components/GuildLogo/GuildLogo';
import OnlineCircle from '@/components/OnlineCircle/OnlineCircle';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

type GuildPageProps = Record<string, never>;
type Params = {
  guildName: string;
};

export const loader = (async ({ params }: LoaderFunctionArgs) => {
  const typedParams = params as unknown as Params;
  return { guildName: typedParams.guildName };
}) satisfies LoaderFunction;

const GuildPage: React.FC<GuildPageProps> = () => {
  const navigate = useNavigate();
  const { t } = useBaseTranslation('guild');
  const { guildName } = useLoaderData() as LoaderData<typeof loader>;

  const { data: guildData, isLoading } = useGetGuild(guildName);

  const onGoBack = () => navigate(-1);

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
      label: t('table.position.title'),
      name: 'guildPosition',
    },
    {
      label: t('table.level'),
      name: 'level',
    },
    {
      label: t('table.resets'),
      name: 'resets',
    },
    {
      label: t('table.online'),
      name: 'online',
    },
  ];

  const mapGuildPositionToLabel: Record<string, string> = {
    [GuildPosition.GUILD_MASTER]: t('table.position.guildMaster'),
    [GuildPosition.BATTLE_MASTER]: t('table.position.battleMaster'),
    [GuildPosition.NORMAL]: t('table.position.member'),
    [GuildPosition.UNDEFINE]: t('table.position.undefine'),
  };

  return (
    <>
      <TitleWithDivider>{t('title')}</TitleWithDivider>
      <div className="flex w-full flex-col gap-8 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-800/20 md:p-12">
        <Button
          variant="ghost1"
          icon={<FaChevronLeft className="size-4" />}
          iconDirection="left"
          onClick={onGoBack}
        >
          {t('backButton')}
        </Button>
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <GuildLogo base64Logo={guildData?.logo as string} size={80} />
              <Typography
                component="h2"
                variant="h3-inter"
                styles="text-primary-950 dark:text-primary-50"
              >
                {guildData?.name}
              </Typography>
            </div>
            <div className="flex gap-12">
              <div className="flex flex-col gap-4">
                <Typography
                  component="h3"
                  variant="h3-inter"
                  styles="text-primary-950 dark:text-primary-50"
                >
                  {t('guildMaster')}
                </Typography>
                <Typography
                  component="span"
                  variant="body1-r"
                  styles="text-primary-950 dark:text-primary-50"
                >
                  {guildData?.guildMaster}
                </Typography>
              </div>
              <div className="flex flex-col gap-4">
                <Typography
                  component="h3"
                  variant="h3-inter"
                  styles="text-primary-950 dark:text-primary-50"
                >
                  {t('score')}
                </Typography>
                <Typography
                  component="span"
                  variant="body1-r"
                  styles="text-primary-950 dark:text-primary-50"
                >
                  {guildData?.score}
                </Typography>
              </div>
            </div>
            <Typography
              component="h3"
              variant="h3-inter"
              styles="text-primary-950 dark:text-primary-50"
            >
              {guildData?.members.length} {t('members')}
            </Typography>
            <Table columns={columns} withIndex>
              {guildData?.members.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    guildData?.members.length != index + 1
                      ? 'border-neutral-300 dark:border-primary-400'
                      : 'border-primary-950 dark:border-primary-50'
                  }`}
                >
                  <Typography
                    component="th"
                    variant="label2-s"
                    styles="text-primary-950 dark:text-primary-50"
                  >
                    {index + 1}
                  </Typography>
                  {columns.slice(0, 2).map((column, colIndex) => (
                    <Typography
                      component="td"
                      key={colIndex}
                      variant="label2-r"
                      styles="text-primary-950 dark:text-primary-50 text-center"
                    >
                      {row[column.name]}
                    </Typography>
                  ))}
                  <Typography
                    component="td"
                    variant="label2-r"
                    styles="text-primary-950 dark:text-primary-50 text-center"
                  >
                    {mapGuildPositionToLabel[row.guildPosition]}
                  </Typography>
                  {columns.slice(3, 5).map((column, colIndex) => (
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
              ))}
            </Table>
          </>
        )}
      </div>
    </>
  );
};

export default GuildPage;

import React from 'react';
import Link from '@/components/Link/Link';

import Table, { Column } from '@/components/Table/Table';
import Typography from '@/components/Typography/Typography';

import type { AccountCharacter } from '@/api/types';
import useBaseTranslation from '@/hooks/use-base-translation';
import TableEmptyMessage from '@/components/Table/TableEmptyMessage/TableEmptyMessage';

type CharactersTableProps = {
  characters: AccountCharacter[];
};

const CharactersTable: React.FC<CharactersTableProps> = ({ characters }) => {
  const { t } = useBaseTranslation('account.charactersTable');
  const columns: Column[] = [
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
  ];

  return (
    <>
      <Table columns={columns} withIndex>
        {characters.length === 0 ? (
          <TableEmptyMessage message={t('emptyMessage')} type="page" />
        ) : (
          characters.map((row, index) => (
            <tr
              key={index}
              className={`border-b ${
                characters.length != index + 1
                  ? 'border-neutral-300 dark:border-primary-400'
                  : 'border-primary-950 dark:border-primary-50'
              }`}
            >
              <Typography
                component="th"
                variant="label3-s"
                styles="text-primary-950 dark:text-primary-50"
              >
                {index + 1}
              </Typography>
              <td className="text-center">
                <Link to={`/my-account/characters/${row.characterName}`}>
                  {row.characterName}
                </Link>
              </td>

              {columns.slice(1, 4).map((column, colIndex) => (
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

export default CharactersTable;

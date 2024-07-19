import React from 'react';

import SwordIcon from './SwordIcon';
import BowIcon from './BowIcon';
import Typography from '../../Typography/Typography';

type TableEmptyMessageProps = { message: string; type: 'card' | 'page' };

const TableEmptyMessage: React.FC<TableEmptyMessageProps> = ({
  message,
  type,
}) => {
  const isCard = type === 'card';
  const colSpan = isCard ? 4 : 6;

  return (
    <>
      <tr className="dark:boder-primary-50 h-[140px] w-full border-b border-primary-950 text-center dark:border-primary-50">
        <td align="center" colSpan={colSpan}>
          <div className="flex items-center justify-center gap-2">
            <SwordIcon styles="size-6 fill-primary-800 dark:fill-primary-200" />
            <Typography
              variant="h4"
              styles="text-primary-800 dark:text-primary-200 font-inter"
              component="span"
            >
              {message}
            </Typography>
            <BowIcon styles="size-6 fill-primary-800 dark:fill-primary-200" />
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableEmptyMessage;

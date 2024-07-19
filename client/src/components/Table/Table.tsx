import React from 'react';
import Typography from '../Typography/Typography';

export type Column = {
  name: string;
  label: string;
  style?: string;
};

type TableProps = {
  columns: Column[];
  withIndex?: boolean;
  children: React.ReactNode;
  fontSize?: '14px' | '16px';
};

const Table: React.FC<TableProps> = ({
  columns,
  withIndex = false,
  children,
  fontSize = '14px',
}) => {
  return (
    <>
      <table className="">
        <thead className="border-b border-primary-950 dark:border-primary-50">
          <tr>
            {withIndex ? <th></th> : null}
            {columns.map((column, index) => (
              <Typography
                component="th"
                key={index}
                variant={fontSize === '14px' ? 'label3-s' : 'label2-s'}
                styles={`${column.style} text-primary-950 dark:text-primary-50`}
              >
                {column.label}
              </Typography>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

export default Table;

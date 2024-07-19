import React from 'react';

import { twMerge } from 'tailwind-merge';

import Typography from '../Typography/Typography';

type ListProps = { children: React.ReactNode; styles?: string };
type ListItemProps = {
  label: string;
  value: React.ReactNode | string;
  styles?: string;
};

const List: React.FC<ListProps> & { Item: React.FC<ListItemProps> } = ({
  children,
  styles,
}) => {
  return (
    <ul className={twMerge('flex w-full flex-col gap-2', styles)}>
      {children}
    </ul>
  );
};

const Item: React.FC<ListItemProps> = ({ label, value, styles }) => {
  return (
    <>
      <li
        className={twMerge(
          'flex justify-between text-primary-950 dark:text-primary-50',
          styles,
        )}
      >
        <Typography component="span" variant="label2-s">
          {label}
        </Typography>
        <Typography component="span" variant="label2-r">
          {value}
        </Typography>
      </li>
      <div className="h-px w-full bg-neutral-300" />
    </>
  );
};

List.Item = Item;

export default List;

import React from 'react';

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';

type LoadingTableBodyProps = Record<string, never>;

const LoadingTableBody: React.FC<LoadingTableBodyProps> = () => {
  return (
    <>
      <tr className="m-auto h-[140px] w-full border-b border-primary-950 text-center dark:border-primary-50">
        <td colSpan={6}>
          <LoadingSpinner />
        </td>
      </tr>
    </>
  );
};

export default LoadingTableBody;

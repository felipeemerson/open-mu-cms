import React from 'react';

type RankingsCardSkeletonProps = Record<string, never>;

const RankingsCardSkeleton: React.FC<RankingsCardSkeletonProps> = () => {
  const rowsNumber = 10;

  return (
    <>
      {new Array(rowsNumber).fill(1).map((_, index) => (
        <tr
          key={index}
          className={`animate-pulse border-b ${
            index + 1 != rowsNumber
              ? 'border-neutral-300'
              : 'border-primary-950'
          }`}
        >
          <td align="center" className="h-[26px]">
            <div className="h-4 w-8 bg-primary-200" />
          </td>
          <td align="center" className="h-[26px]">
            <div className="h-4 w-[60px] bg-primary-200" />
          </td>
          <td align="center" className="h-[26px]">
            <div className="h-4 w-8 bg-primary-200" />
          </td>
          <td align="center" className="h-[26px]">
            <div className="h-4 w-8 bg-primary-200" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default RankingsCardSkeleton;

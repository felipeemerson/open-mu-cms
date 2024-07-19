import React from 'react';
import Typography from '../Typography/Typography';

type PaginationProps = {
  onPageChange: (nextPage: number) => void;
  totalPages: number;
  currentPage: number;
  styles: string;
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  styles,
}) => {
  return (
    <>
      <div className={`flex items-end gap-1 ${styles}`}>
        {totalPages <= 5 &&
          new Array(totalPages)
            .fill(true)
            .map((_, index) => (
              <PaginationButton
                key={index}
                value={index + 1}
                active={index + 1 === currentPage}
                onClick={() => onPageChange(index + 1)}
              />
            ))}

        {totalPages > 5 && (
          <PaginationButton
            value={1}
            active={1 === currentPage}
            onClick={() => onPageChange(1)}
          />
        )}

        {totalPages > 5 && (
          <>
            {currentPage > 2 && (
              <Typography
                component="span"
                variant="label2-s"
                styles="text-primary-400"
              >
                ...
              </Typography>
            )}

            {currentPage - 1 > 1 && (
              <PaginationButton
                active={false}
                value={currentPage - 1}
                onClick={() => onPageChange(currentPage - 1)}
              />
            )}

            {currentPage !== 1 && currentPage !== totalPages && (
              <PaginationButton
                active={true}
                value={currentPage}
                onClick={() => onPageChange(currentPage)}
              />
            )}

            {currentPage + 1 < totalPages && (
              <PaginationButton
                active={false}
                value={currentPage + 1}
                onClick={() => onPageChange(currentPage + 1)}
              />
            )}

            {currentPage < totalPages - 1 && (
              <Typography
                component="span"
                variant="label2-s"
                styles="text-primary-400"
              >
                ...
              </Typography>
            )}
          </>
        )}

        {totalPages > 5 && (
          <PaginationButton
            value={totalPages}
            active={totalPages === currentPage}
            onClick={() => onPageChange(totalPages)}
          />
        )}
      </div>
    </>
  );
};

type PaginationButtonProps = {
  value: number;
  active: boolean;
  onClick: () => void;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  value,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (!active) {
      onClick();
    }
  };

  return (
    <>
      <button
        className={`size-8 rounded-[4px] border border-primary-500 font-inter text-[14px] font-semibold leading-[125%] ${
          active
            ? 'bg-primary-500 text-white'
            : 'bg-inherit text-primary-500 hover:bg-primary-200'
        }`}
        onClick={handleClick}
      >
        {value}
      </button>
    </>
  );
};

export default Pagination;

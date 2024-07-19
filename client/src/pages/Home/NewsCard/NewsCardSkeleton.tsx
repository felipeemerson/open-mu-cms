import React from 'react';

type NewsCardSkeletonProps = Record<string, never>;

const NewsCardSkeleton: React.FC<NewsCardSkeletonProps> = () => {
  return (
    <>
      <section
        className="flex w-full animate-pulse snap-center flex-col
            justify-between gap-4 scroll-smooth rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-900 dark:bg-primary-800/20"
      >
        <div className="flex justify-between">
          <div className="h-[27px] w-36 bg-primary-200" />
          <div className="h-[27px] w-[83px] bg-primary-200" />
        </div>
        <div className="flex flex-col gap-2 pr-16">
          <div className="h-5 bg-primary-200" />
          <div className="h-5 bg-primary-200" />
          <div className="h-5 bg-primary-200" />
          <div className="h-5 bg-primary-200" />
          <div className="h-5 bg-primary-200" />
        </div>
        <div className="h-11 w-[90px] self-end bg-primary-200" />
      </section>
    </>
  );
};

export default NewsCardSkeleton;

import React from 'react';

type ServerCardSkeletonProps = Record<string, never>;

const ServerCardSkeleton: React.FC<ServerCardSkeletonProps> = () => {
  return (
    <>
      <div className="flex animate-pulse flex-col gap-2">
        <div className="flex h-5 w-full justify-between">
          <div className="w-[46px] bg-primary-200" />
          <div className="w-[95px] bg-primary-200" />
        </div>

        <div className="h-px w-full bg-neutral-300" />

        <div className="flex h-5 w-full justify-between">
          <div className="w-[32px] bg-primary-200" />
          <div className="w-[40px] bg-primary-200" />
        </div>

        <div className="h-px w-full bg-neutral-300" />

        <div className="flex h-5 w-full justify-between">
          <div className="w-[84px] bg-primary-200" />
          <div className="w-[24px] bg-primary-200" />
        </div>

        <div className="h-px w-full bg-neutral-300" />

        <div className="flex h-5 w-full justify-between">
          <div className="w-[42px] bg-primary-200" />
          <div className="w-[30px] bg-primary-200" />
        </div>

        <div className="h-px w-full bg-neutral-300" />

        <div className="flex h-5 w-full justify-between">
          <div className="w-[48px] bg-primary-200" />
          <div className="w-[32px] bg-primary-200" />
        </div>

        <div className="h-px w-full bg-neutral-300" />

        <div className="flex h-5 w-full justify-between">
          <div className="w-[46px] bg-primary-200" />
          <div className="w-[24px] bg-primary-200" />
        </div>

        <div className="h-px w-full bg-neutral-300" />

        <div className="flex h-5 w-full justify-between">
          <div className="w-[53px] bg-primary-200" />
          <div className="w-[24px] bg-primary-200" />
        </div>

        <div className="h-px w-full bg-neutral-300" />
      </div>
    </>
  );
};

export default ServerCardSkeleton;

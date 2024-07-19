import React from 'react';

import { twMerge } from 'tailwind-merge';

type NewsHtmlContainerProps = { children: React.ReactNode; styles?: string };

const NewsHtmlContainer: React.FC<NewsHtmlContainerProps> = ({
  children,
  styles = '',
}) => {
  return (
    <>
      <div
        className={twMerge(
          `"prose-h1: md:prose-ul:text-[16px]" prose prose-primary max-w-none prose-headings:my-1 prose-headings:leading-[125%] prose-h1:text-[40px] prose-h2:text-[24px]
                      prose-h3:text-[18px] prose-h4:text-[16px] prose-p:my-1 prose-p:text-[12px] prose-p:leading-[150%] hover:prose-a:cursor-pointer hover:prose-a:text-primary-700 prose-figure:m-2 prose-ol:text-[16px] prose-ul:text-[16px]
                      prose-li:my-[2px] dark:prose-headings:text-primary-50 dark:prose-p:text-primary-50 dark:prose-a:text-primary-400 dark:hover:prose-a:text-primary-300 dark:prose-li:text-primary-50 md:prose-h2:text-[32px]
                      md:prose-h3:text-[24px] md:prose-h4:text-[18px] md:prose-p:text-[16px] md:prose-ol:text-[16px]`,
          styles,
        )}
      >
        {children}
      </div>
    </>
  );
};

export default NewsHtmlContainer;

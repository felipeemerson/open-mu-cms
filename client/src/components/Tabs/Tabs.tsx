import React from 'react';

import Typography from '../Typography/Typography';

type TabsProps = {
  tabs: string[];
  activeTab: number;
  onChangeTab: (activeTab: number) => void;
  styles?: string;
};

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChangeTab,
  styles,
}) => {
  return (
    <>
      <div
        className={`w-fit border-b border-primary-200 dark:border-primary-500 ${styles}`}
      >
        {tabs.map((tab, index) => (
          <Typography
            key={index}
            component="button"
            variant={activeTab === index ? 'label2-s' : 'label2-r'}
            styles={`text-primary-950 dark:text-primary-50 p-1 ${
              activeTab === index
                ? 'border-b-2 border-primary-500 dark:border-primary-300'
                : ''
            }`}
            onClick={() => onChangeTab(index)}
          >
            {tab}
          </Typography>
        ))}
      </div>
    </>
  );
};

export default Tabs;

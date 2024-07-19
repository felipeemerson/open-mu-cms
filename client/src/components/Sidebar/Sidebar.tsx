import React, { useContext } from 'react';

import { AuthContext, AuthStateEnum } from '@/contexts/AuthContext';

import LoginCard from './Cards/LoginCard';
import ServerCard from './Cards/ServerCard/ServerCard';
import RankingsCard from './Cards/RankingsCard/RankingsCard';
import AccountCard from '../AccountCard/AccountCard';

type SidebarProps = Record<string, never>;

const Sidebar: React.FC<SidebarProps> = () => {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <aside className="hidden gap-4 overflow-x-auto md:flex lg:mx-auto lg:overflow-visible desktop:max-w-[314px] desktop:flex-col">
        {auth.state === AuthStateEnum.SIGNED_IN ? (
          <AccountCard />
        ) : (
          <LoginCard />
        )}
        <ServerCard />
        <RankingsCard />
      </aside>
    </>
  );
};

export default Sidebar;

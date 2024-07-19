import { Outlet } from 'react-router-dom';
import RootLayout from './RootLayout';

const Root = () => {
  return (
    <>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </>
  );
};

export default Root;

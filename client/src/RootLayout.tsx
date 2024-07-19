import { AuthProvider } from './contexts/AuthContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider } from './contexts/ToastContext';

import headerBg from './assets/images/bg-end.png';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import ScrollToHashElement from './components/ScrollToHashElement/ScrollToHashElement';
import Toast from './components/Toast/Toast';

type RootLayoutProps = { children: React.ReactNode };

const queryClient = new QueryClient();

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastProvider>
            <ScrollToHashElement behavior="smooth" block="center" />
            <header className="m-auto max-w-[1328px]">
              <img
                className="hidden object-cover md:inline-block"
                src={headerBg}
              />
            </header>
            <Navbar />
            <div className="mx-auto mt-4 flex max-w-[1328px] flex-col-reverse justify-center gap-6 px-6 desktop:flex-row desktop:p-0">
              <main className="mx-auto flex w-full max-w-[990px] flex-col gap-6">
                {children}
              </main>
              <Sidebar />
            </div>
            <Footer />
            <Toast />
          </ToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default RootLayout;

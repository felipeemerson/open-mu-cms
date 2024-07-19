import { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import withSuspense from './components/withSuspense/withSuspense';

import Root from './Root';
import RootLayout from './RootLayout';

const HomePage = withSuspense(lazy(() => import('./pages/Home/Home')));
const SignUpPage = withSuspense(lazy(() => import('./pages/Sign-Up/Sign-Up')));
const DownloadsPage = withSuspense(
  lazy(() => import('./pages/Downloads/Downloads')),
);
const AccountPage = withSuspense(lazy(() => import('./pages/Account/Account')));
const CharacterPage = withSuspense(
  lazy(() => import('./pages/Character/Character')),
);
const NewsPage = withSuspense(lazy(() => import('./pages/News/News')));
const RankingsPage = withSuspense(
  lazy(() => import('./pages/Rankings/Rankings')),
);
const AboutPage = withSuspense(lazy(() => import('./pages/About/About')));
const GuildPage = withSuspense(lazy(() => import('./pages/Guild/Guild')));
const OnlinesPage = withSuspense(lazy(() => import('./pages/Onlines/Onlines')));
const Error404Page = withSuspense(lazy(() => import('./pages/Error/Error404')));
const Error500Page = withSuspense(lazy(() => import('./pages/Error/Error500')));
const CreateNewsFormPage = withSuspense(
  lazy(() => import('./pages/CreateNewsForm/CreateNewsForm')),
);
const EditNewsPage = withSuspense(
  lazy(() => import('./pages/EditNews/EditNews')),
);
const EditBannersPage = withSuspense(
  lazy(() => import('./pages/EditBanners/EditBanners')),
);

import { loader as characterLoader } from './pages/Character/Character';
import { loader as newsLoader } from './pages/News/News';
import { loader as rankingsLoader } from './pages/Rankings/Rankings';
import { loader as guildLoader } from './pages/Guild/Guild';
import { loader as onlinesLoader } from './pages/Onlines/Onlines';
import { loader as editNewsLoader } from './pages/EditNews/EditNews';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={
        <RootLayout>
          <Error500Page />
        </RootLayout>
      }
    >
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/downloads" element={<DownloadsPage />} />
      <Route
        path="/my-account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-account/characters/:characterName"
        loader={characterLoader}
        element={
          <ProtectedRoute>
            <CharacterPage />
          </ProtectedRoute>
        }
      />
      <Route path="/news" loader={newsLoader} element={<NewsPage />} />
      <Route
        path="/rankings"
        loader={rankingsLoader}
        element={<RankingsPage />}
      />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/guilds/:guildName"
        loader={guildLoader}
        element={<GuildPage />}
      />
      <Route path="/onlines" element={<OnlinesPage />} loader={onlinesLoader} />
      <Route
        path="/news/add"
        element={
          <ProtectedRoute>
            <CreateNewsFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/news/edit/:newsId"
        element={
          <ProtectedRoute>
            <EditNewsPage />
          </ProtectedRoute>
        }
        loader={editNewsLoader}
      />
      <Route
        path="/banners"
        element={
          <ProtectedRoute>
            <EditBannersPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Error404Page />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

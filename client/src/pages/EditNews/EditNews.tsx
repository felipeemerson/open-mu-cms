import React, { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  LoaderFunction,
  LoaderFunctionArgs,
  Navigate,
  useLoaderData,
} from 'react-router-dom';

import { AuthContext } from '@/contexts/AuthContext';
import { AccountState, type JWTPayload } from '@/api/types';
import { useGetNewsById } from '@/api/news';

import NewsForm from '@/components/NewsForm/NewsForm';
import { LoaderData } from '@/types/react-router-dom';

type EditNewsPageProps = Record<string, never>;

type Params = {
  newsId: string;
};

export const loader = (async ({ params }: LoaderFunctionArgs) => {
  const typedParams = params as unknown as Params;
  return { newsId: typedParams.newsId };
}) satisfies LoaderFunction;

const EditNewsPage: React.FC<EditNewsPageProps> = () => {
  const { auth } = useContext(AuthContext);
  const { newsId } = useLoaderData() as LoaderData<typeof loader>;
  const { data: newsData, isLoading } = useGetNewsById(newsId);

  const jwtPayload: JWTPayload | undefined = auth.token
    ? jwtDecode(auth.token)
    : undefined;
  const hasPrivilege =
    (jwtPayload?.role || AccountState.NORMAL) === AccountState.GAME_MASTER;

  if (!hasPrivilege) return <Navigate to="/" />;
  return (
    <>
      <NewsForm isEditing news={newsData} isLoadingEditData={isLoading} />
    </>
  );
};

export default EditNewsPage;

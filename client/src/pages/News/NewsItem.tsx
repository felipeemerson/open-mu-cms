import React, { useContext, useState } from 'react';
import DOMPurify from 'dompurify';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { MdEdit } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import { AccountState, type JWTPayload, type News } from '@/api/types';
import { AuthContext } from '@/contexts/AuthContext';
import useBaseTranslation from '@/hooks/use-base-translation';

import Typography from '@/components/Typography/Typography';
import Button from '@/components/Button/Button';
import NewsDeleteModal from './NewsDeleteModal';
import NewsHtmlContainer from '@/components/NewsHtmlContainer/NewsHtmlContainer';

type NewsItemProps = {
  news: News;
  onDeleteNews: (newsId: string) => void;
};

const NewsItem: React.FC<NewsItemProps> = ({
  news: { title, authorName, content, id, creationDate, lastUpdatedDate },
  onDeleteNews,
}) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { t } = useBaseTranslation('news.newsItem');
  const jwtPayload: JWTPayload | undefined = auth.token
    ? jwtDecode(auth.token)
    : undefined;
  const canEdit =
    (jwtPayload?.role || AccountState.NORMAL) === AccountState.GAME_MASTER;

  const toggleModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const onEditClick = () => {
    navigate(`/news/edit/${id}`);
  };

  const getDateFormatted = (dateToFormat: number): string => {
    const dateFormatted = new Date(dateToFormat);
    //dateFormatted.setUTCHours(dateFormatted.getUTCHours() - 3);
    const datePart = dateFormatted.toLocaleDateString();
    const timePart = dateFormatted.toLocaleTimeString();

    return `${datePart} ${timePart}`;
  };

  return (
    <>
      <div
        id={id}
        className="flex w-full flex-col rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-800/20 md:gap-2 md:p-12"
      >
        <div className="flex gap-2">
          <div className="flex w-full flex-col gap-2">
            <Typography
              component="h2"
              variant="h3-inter"
              styles="text-primary-950 dark:text-primary-50"
            >
              {title}
            </Typography>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1 md:flex-row">
                <Typography
                  component="span"
                  variant="body2-m"
                  styles="text-primary-800 dark:text-primary-200 opacity-60"
                >
                  {t('creationDate') + ': '}
                  {getDateFormatted(creationDate)}
                  {lastUpdatedDate && ','}
                </Typography>
                {lastUpdatedDate && (
                  <Typography
                    component="span"
                    variant="body2-m"
                    styles="text-primary-800 dark:text-primary-200 opacity-60"
                  >
                    {t('lastUpdatedDate') + ': '}
                    {getDateFormatted(lastUpdatedDate)}
                  </Typography>
                )}
              </div>
              <Typography
                component="span"
                variant="body1-m"
                styles="text-primary-950 dark:text-primary-50"
              >
                {t('postedBy') + ': '}
                <Typography component="strong" variant="label2-s">
                  {authorName}
                </Typography>
              </Typography>
            </div>
          </div>
          {canEdit && (
            <div className="flex w-fit gap-2">
              <Button
                variant="ghost1"
                icon={<MdEdit className="size-6" />}
                onClick={onEditClick}
              />
              <Button
                variant="ghost1"
                icon={<MdDelete className="size-6" />}
                onClick={toggleModal}
              />
            </div>
          )}
        </div>
        <NewsHtmlContainer>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content, {
                USE_PROFILES: { html: true },
              }),
            }}
          />
        </NewsHtmlContainer>
      </div>
      {openDeleteModal ? (
        <NewsDeleteModal
          onClose={toggleModal}
          onDeleteNews={onDeleteNews}
          newsTitle={title}
          id={id}
        />
      ) : null}
    </>
  );
};

export default NewsItem;

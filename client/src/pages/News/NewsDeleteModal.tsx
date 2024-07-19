import React, { useEffect, createRef } from 'react';

import { MdClose } from 'react-icons/md';

import { useDeleteNews } from '@/api/news';
import { useToast } from '@/contexts/ToastContext';
import useBaseTranslation from '@/hooks/use-base-translation';

import Typography from '@/components/Typography/Typography';
import Button from '@/components/Button/Button';

type NewsDeleteModalProps = {
  onClose: () => void;
  newsTitle: string;
  id: string;
  onDeleteNews: (newsId: string) => void;
};

const NewsDeleteModal: React.FC<NewsDeleteModalProps> = ({
  onClose,
  newsTitle,
  id,
  onDeleteNews,
}) => {
  const dialogRef = createRef<HTMLDialogElement>();
  const handleClickOutside = (event: MouseEvent) => {
    event.stopImmediatePropagation();
    if (dialogRef && !dialogRef?.current?.contains(event.target as Node)) {
      onClose();
    }
  };

  const { openToast } = useToast();
  const deleteNews = useDeleteNews();
  const { t } = useBaseTranslation('news.newsDeleteModal');

  const onDelete = () => {
    deleteNews.mutate(id, {
      onSuccess: () => {
        onDeleteNews(id);
        openToast.success(t('successMessage'));
        onClose();
      },
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);
  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-25" />
        <dialog
          ref={dialogRef}
          open
          tabIndex={-1}
          className="fixed z-20 flex max-w-72 origin-center transform animate-scale flex-col gap-8 rounded-lg border border-primary-200 bg-primary-50 p-6 outline-none dark:border-primary-900 dark:bg-neutral-900 md:max-w-[700px]"
        >
          <div className="flex place-items-center justify-between">
            <Typography
              component="h1"
              variant="h3-inter"
              styles="text-primary-950 dark:text-primary-50"
            >
              {t('title')}
            </Typography>
            <Button
              variant="ghost1"
              icon={<MdClose className="size-6" />}
              onClick={onClose}
            />
          </div>
          <Typography
            component="span"
            variant="body1-r"
            styles="text-primary-950 dark:text-primary-50"
          >
            {t('message') + ' '}
            <Typography component="strong" variant="body1-m" styles="inline">
              {newsTitle}
            </Typography>
            ?
          </Typography>
          <div className="flex gap-4">
            <Button variant="bezel" onClick={onDelete}>
              {t('excludeButton')}
            </Button>
            <Button variant="outline" onClick={onClose}>
              {t('cancelButton')}
            </Button>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default NewsDeleteModal;

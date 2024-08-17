import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';

import type { News, NewsForm } from '@/api/types';
import { useGetAccount } from '@/api/account';
import { useCreateNews, useUpdateNews } from '@/api/news';
import { useToast } from '@/contexts/ToastContext';
import useBaseTranslation from '@/hooks/use-base-translation';

import TitleWithDivider from '@/components/TitleWithDivider/TitleWithDivider';
import Typography from '@/components/Typography/Typography';
import FormInput from '@/components/FormInput/FormInput';
import Button from '@/components/Button/Button';
import RichTextCKEditor from './RichTextCKEditor';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Select, { Option } from '../Select/Select';
import NewsHtmlContainer from '../NewsHtmlContainer/NewsHtmlContainer';

type NewsFormProps = {
  isEditing: boolean;
  news?: News;
  isLoadingEditData?: boolean;
};

const NewsFormComponent: React.FC<NewsFormProps> = ({
  isEditing,
  news,
  isLoadingEditData,
}) => {
  const { data: accountData, isLoading: isLoadingAccount } = useGetAccount();
  const { t } = useBaseTranslation('newsForm');

  const [showPreview, setShowPreview] = useState(false);
  const [selectOptions, setSelectOptions] = useState<Option[]>([]);
  const isLoading = isEditing
    ? isLoadingAccount || isLoadingEditData
    : isLoadingAccount;
  const navigate = useNavigate();
  const { openToast } = useToast();
  const createMutation = useCreateNews();
  const updateMutation = useUpdateNews();

  const { control, handleSubmit, watch, setValue } = useForm<NewsForm>({
    criteriaMode: 'all',
    mode: 'all',
    defaultValues: {
      title: '',
      authorName: '',
      content: '',
    },
  });

  const onShowPreview = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowPreview(!showPreview);
  };

  const onSubmit = (data: NewsForm) => {
    if (isEditing) {
      updateMutation.mutate(
        {
          ...(news as News),
          title: data.title,
          content: data.content,
          authorName: data.authorName,
        },
        {
          onSuccess: () => {
            openToast.success(t('edit.successMessage'));
            navigate('/news');
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: (createdNews) => {
          openToast.success(t('add.successMessage'));
          navigate('/news#' + createdNews.id);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  };

  const content = watch('content');

  useEffect(() => {
    const characterOptions = [
      ...((accountData?.characters.map((c) => {
        return {
          label: c.characterName,
          value: c.characterName,
        };
      }) as Option[]) || []),
    ];

    if (!isLoading && !isEditing) {
      setSelectOptions(characterOptions);
      setValue('authorName', characterOptions[0]?.value || '');
    } else if (!isLoading && isEditing) {
      setValue('authorName', news?.authorName as string);
      setValue('content', news?.content as string);
      setValue('title', news?.title as string);

      const newsAuthorIsFromAnotherAccount = !selectOptions.some(
        (option) => option.value === news?.authorName,
      );

      if (newsAuthorIsFromAnotherAccount) {
        setSelectOptions([
          {
            label: news?.authorName as string,
            value: news?.authorName as string,
          },
          ...characterOptions,
        ]);
      }
    }
  }, [isLoading, isEditing, accountData]);

  return (
    <>
      <TitleWithDivider>{t('title')}</TitleWithDivider>
      <div className="flex w-full flex-col gap-8 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-900 dark:bg-primary-800/20 md:p-12">
        <Typography
          variant="h3-inter"
          component="h2"
          styles="text-primary-950 dark:text-primary-50"
        >
          {isEditing ? t('edit.title') : t('add.title')}
        </Typography>
        {isLoading || (isEditing && news?.content === '') ? (
          <div className="flex h-80 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInput
              label={t('titleField')}
              name="title"
              control={control}
              fullWidth
              type="text"
              rules={{
                required: t('form.errorMessages.required'),
                minLength: {
                  value: 3,
                  message: t('form.errorMessages.minimumLength', {
                    minLength: 3,
                  }),
                },
                maxLength: {
                  value: 50,
                  message: t('form.errorMessages.maximumLength', {
                    maxLength: 50,
                  }),
                },
              }}
            />
            <Controller
              control={control}
              name="authorName"
              render={({ field: { value, onChange } }) => (
                <Select
                  name="authorName"
                  label={t('author')}
                  value={value}
                  onSelect={(v) => onChange(v)}
                  options={selectOptions}
                />
              )}
            />

            <div role="label" className="flex flex-col gap-1">
              <Typography
                variant="label3-m"
                styles="text-primary-950 dark:text-primary-50"
                component="span"
              >
                {t('content')}
              </Typography>
              <RichTextCKEditor
                control={control}
                initialValue={news?.content}
              />
            </div>
            {watch('content') && (
              <Button variant="outline" onClick={onShowPreview}>
                {showPreview ? t('hidePreview') : t('showPreview')}
              </Button>
            )}
            {showPreview && content && (
              <NewsHtmlContainer>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content, {
                      USE_PROFILES: { html: true },
                    }),
                  }}
                />
              </NewsHtmlContainer>
            )}
            <div className="flex gap-2">
              <Button type="submit">
                {isEditing ? t('edit.saveButton') : t('add.saveButton')}
              </Button>
              <Button variant="outline" onClick={() => navigate(-1)}>
                {t('cancelButton')}
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default NewsFormComponent;

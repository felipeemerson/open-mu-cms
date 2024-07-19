import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { MdClose as RemoveIcon } from 'react-icons/md';
import { FaPlus as PlusIcon } from 'react-icons/fa6';

import { Banner } from '@/api/types';
import { useChangeBanners } from '@/api/banners';
import { useToast } from '@/contexts/ToastContext';
import useBaseTranslation from '@/hooks/use-base-translation';

import Radio from '@/components/Radio/Radio';
import Typography from '@/components/Typography/Typography';
import FormInput from '@/components/FormInput/FormInput';
import Button from '@/components/Button/Button';
import ImageSlider from '@/components/ImageSlider/ImageSlider';

type Form = {
  banners: Banner[];
};

type BannersFormProps = Form;

const BannersForm: React.FC<BannersFormProps> = ({ banners }) => {
  const navigate = useNavigate();
  const changeBannersMutation = useChangeBanners();
  const { t } = useBaseTranslation('editBanners');
  const { openToast } = useToast();
  const { control, handleSubmit, watch, setValue } = useForm<Form>({
    mode: 'all',
    defaultValues: { banners },
  });
  const [showPreview, setShowPreview] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'banners',
  });

  const currentBanners = watch('banners');
  const currentBannersLength = currentBanners.length;
  const MAX_BANNERS = import.meta.env.VITE_MAX_BANNERS;

  const onNewBanner = () => {
    append({
      id: null,
      imageUrl: '',
      hasLink: false,
      link: null,
      isExternalLink: null,
      orderIndex: currentBannersLength + 1,
    });
  };

  const onSubmit = (data: Form) => {
    changeBannersMutation.mutate(data.banners, {
      onSuccess: () => {
        openToast.success(t('successMessage'));
        navigate('/');
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {fields.length === 0 && (
          <Typography
            variant="h3-inter"
            styles="text-primary-950 dark:text-primary-50"
          >
            {t('emptyMessage')}
          </Typography>
        )}
        <div className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2">
          {fields.map((item, index) => (
            <fieldset
              key={item.id}
              className="flex h-fit flex-col gap-2 md:max-w-80"
            >
              <div className="flex gap-2">
                <Typography
                  variant="h3-inter"
                  styles="text-primary-950 dark:text-primary-50"
                  component="legend"
                >
                  {t('subtitle')} {index + 1}
                </Typography>
                <button onClick={() => remove(index)}>
                  <RemoveIcon className="size-5 text-red-500 hover:text-red-700 dark:hover:text-red-300" />
                </button>
              </div>
              <FormInput
                label={t('imageUrl')}
                name={`banners.${index}.imageUrl` as const}
                control={control}
                fullWidth
                type="text"
                rules={{
                  required: t('errorMessages.required'),
                }}
              />
              <div className="flex gap-4">
                <Controller
                  control={control}
                  name={`banners.${index}.hasLink` as const}
                  defaultValue={false}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Radio
                      checked={value}
                      label={t('hasLink')}
                      onChange={(v: boolean) => {
                        onChange(v);
                        setValue(`banners.${index}.link`, '');
                        setValue(`banners.${index}.isExternalLink`, false);
                      }}
                      onBlur={onBlur}
                    />
                  )}
                />
                {watch(`banners.${index}.hasLink` as const) && (
                  <Controller
                    control={control}
                    name={`banners.${index}.isExternalLink`}
                    defaultValue={false}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Radio
                        checked={value || false}
                        label={t('isExternalLink')}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                )}
              </div>
              {watch(`banners.${index}.hasLink` as const) && (
                <FormInput
                  label={t('link')}
                  name={`banners.${index}.link` as const}
                  control={control}
                  fullWidth
                  type="text"
                  rules={{
                    required: t('errorMessages.required'),
                  }}
                />
              )}
              <FormInput
                label={t('orderIndex')}
                name={`banners.${index}.orderIndex` as const}
                control={control}
                type="number"
                styles="w-20"
                rules={{
                  required: t('errorMessages.required'),
                  min: {
                    value: 1,
                    message: t('errorMessages.minimum', { min: 1 }),
                  },
                  max: {
                    value: currentBannersLength,
                    message: t('errorMessages.maximum', {
                      max: currentBannersLength,
                    }),
                  },
                }}
              />
            </fieldset>
          ))}
        </div>
        <Button
          type="button"
          size="medium"
          icon={<PlusIcon className="mr-2 size-4" />}
          variant="outline"
          onClick={onNewBanner}
          disabled={currentBannersLength === MAX_BANNERS}
        >
          {t('addBannerButton')}
        </Button>
        {currentBannersLength > 0 && (
          <Button
            type="button"
            size="medium"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? t('showPreview') : t('hidePreview')}
          </Button>
        )}
        {showPreview && <ImageSlider banners={currentBanners} />}
        <div className="mt-8 flex gap-2">
          <Button type="submit" variant="flat">
            {t('saveButton')}
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            {t('cancelButton')}
          </Button>
        </div>
      </form>
    </>
  );
};

export default BannersForm;

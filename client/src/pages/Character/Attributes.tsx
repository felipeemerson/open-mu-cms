import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import type { CharacterAttributes, CharacterDetails } from '@/api/types';
import useBaseTranslation from '@/hooks/use-base-translation';
import { useToast } from '@/contexts/ToastContext';
import { useAddAttributes } from '@/api/characters';

import Typography from '@/components/Typography/Typography';
import List from '@/components/List/List';
import Button from '@/components/Button/Button';

type AttributesProps = {
  character: CharacterDetails;
};

const Attributes: React.FC<AttributesProps> = ({ character }) => {
  const { t } = useBaseTranslation('character.attributes');
  const { openToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [attributes, setAttributes] = useState<CharacterAttributes>(
    character.attributes,
  );
  const [levelUpPoints, setLevelUpPoints] = useState(character.levelUpPoints);
  const { control, watch, handleSubmit, setValue, getValues, reset } =
    useForm<CharacterAttributes>({
      criteriaMode: 'all',
      mode: 'all',
      defaultValues: {
        strength: 0,
        agility: 0,
        vitality: 0,
        energy: 0,
        command: 0,
      },
    });

  const fields: (keyof CharacterAttributes)[] = [
    'strength',
    'agility',
    'vitality',
    'energy',
  ];
  const numberFormat = Intl.NumberFormat();

  const onCancel = () => {
    setAttributes(character.attributes);
    setLevelUpPoints(character.levelUpPoints);
    reset();
    setIsEditing(false);
  };

  const isDLOrLE = ['Dark Lord', 'Lord Emperor'].includes(
    character.characterClassName,
  );

  const currentPoints: CharacterAttributes = Object.keys(
    character.attributes,
  ).reduce((acc, currentValue) => {
    const attributeName = currentValue as keyof CharacterAttributes;
    const attributeValue = attributes[attributeName] ?? 0;
    const watchedValue = watch(attributeName) ?? 0;

    return {
      ...acc,
      [currentValue]: attributeValue + watchedValue,
    };
  }, {} as CharacterAttributes & Record<string, number>);

  const MAX_POINTS = import.meta.env.VITE_MAX_STAT_POINTS;
  const maxPointsFormatted = numberFormat.format(MAX_POINTS);
  const currentErrors: boolean[] = Object.values(currentPoints).map(
    (stats) => stats > MAX_POINTS,
  );
  currentErrors.push(levelUpPoints < 0);

  const translations = [t('str'), t('agi'), t('vit'), t('ene')];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof CharacterAttributes,
  ) => {
    let value = e.target.value;
    value = value.replaceAll(/[^0-9]/g, '');
    const valueAsInt = parseInt(value) || 0;

    const diff = getValues(fieldName) - valueAsInt;

    if (value.length <= 5) {
      setValue(fieldName, valueAsInt);
      setLevelUpPoints(levelUpPoints + diff);
    }
  };

  const addAttributesMutation = useAddAttributes();

  const onSubmit = (data: CharacterAttributes) => {
    if (currentErrors.some((v) => v)) return;
    if (Object.values(getValues()).reduce((a, b) => a + b, 0) === 0) {
      openToast.warning(t('form.errorMessages.noPointsAdded'));
      return;
    }

    addAttributesMutation.mutate(
      { characterName: character.characterName, attributes: data },
      {
        onSuccess: (data) => {
          openToast.success(t('form.successMessage'));
          setIsEditing(false);
          reset();
          setAttributes(data.attributes);
          setLevelUpPoints(data.levelUpPoints);
        },
        onError: (error: Error) => {
          const errorAxios = error as AxiosError;
          const errorMessage = errorAxios.response?.data as string;

          if (errorMessage === 'Disconnect from the game before do this') {
            openToast.error(t('form.errorMessages.connectedAccount'));
          } else if (errorMessage.includes('Not enough points available')) {
            openToast.error(
              t('form.errorMessages.notEnoughPoints', {
                pointsAvailable: errorMessage.split(' ').pop(),
              }),
            );
          }

          reset(data);
        },
      },
    );
  };

  useEffect(() => {
    console.log('effect');
    reset();
    setAttributes(character.attributes);
    setLevelUpPoints(character.levelUpPoints);
  }, [character.levelUpPoints, character.attributes, reset]);

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <Typography
          component="h3"
          variant="h3-inter"
          styles="text-primary-950 dark:text-primary-50"
        >
          {t('title')}
        </Typography>
        <Typography
          variant="body1-r"
          styles="text-primary-950 dark:text-primary-50"
        >
          {t('pointsToAdd')}: &nbsp;
          <Typography
            component="strong"
            variant="body1-r"
            styles={`font-semibold ${
              levelUpPoints < 0
                ? 'text-red-500'
                : 'text-primary-950 dark:text-primary-50'
            }`}
          >
            {numberFormat.format(levelUpPoints)}
          </Typography>
        </Typography>
        <div className="flex gap-4">
          <List styles="max-w-80">
            {fields.map((field, index) => (
              <List.Item
                key={index}
                label={translations[index]}
                styles={`h-8 items-center ${
                  currentErrors[index] && 'text-red-500 dark:text-red-500'
                }`}
                value={
                  <div className="flex gap-1">
                    {numberFormat.format(currentPoints[field])}
                  </div>
                }
              />
            ))}
            {isDLOrLE && (
              <List.Item
                label={t('cmd')}
                styles={`h-8 items-center ${
                  currentErrors[4] && 'text-red-500 dark:text-red-500'
                }`}
                value={
                  <div className="flex gap-1">
                    {Intl.NumberFormat().format(currentPoints.command)}
                  </div>
                }
              />
            )}
          </List>
          {isEditing && (
            <form id="attributesForm" className="flex flex-col gap-[18px]">
              {fields.map((field: keyof CharacterAttributes, index: number) => (
                <Controller
                  key={index}
                  control={control}
                  disabled={addAttributesMutation.isPending}
                  name={field}
                  render={({ field: { onBlur, value, name, ref } }) => (
                    <input
                      className={`h-8 w-[68px] rounded-[4px] border border-neutral-300 p-2 font-inter text-primary-950 focus:border-primary-500 focus:outline-none
                            focus:ring-1 focus:ring-primary-500 disabled:bg-primary-100 disabled:text-neutral-500
                            disabled:shadow-none disabled:placeholder:text-neutral-500 dark:bg-neutral-900 dark:text-primary-50 dark:disabled:bg-primary-900
                        `}
                      value={value}
                      name={name}
                      onChange={(e) => handleChange(e, field)}
                      onBlur={onBlur}
                      ref={ref}
                    />
                  )}
                />
              ))}

              {isDLOrLE && (
                <Controller
                  control={control}
                  disabled={addAttributesMutation.isPending}
                  name="command"
                  render={({ field: { onBlur, value, name, ref } }) => (
                    <input
                      className={`h-8 w-[68px] rounded-[4px] border border-neutral-300 p-2 font-inter text-primary-950 focus:border-primary-500
                            focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-primary-100 disabled:text-neutral-500
                            disabled:shadow-none disabled:placeholder:text-neutral-500 dark:bg-neutral-900 dark:text-primary-50 dark:disabled:bg-primary-900
                        `}
                      value={value}
                      name={name}
                      onChange={(e) => handleChange(e, 'command')}
                      onBlur={onBlur}
                      ref={ref}
                    />
                  )}
                />
              )}
            </form>
          )}
        </div>
        {!isEditing && (
          <Button
            variant="bezel"
            onClick={() => setIsEditing(true)}
            disabled={levelUpPoints === 0}
          >
            {t('form.addPointsButton')}
          </Button>
        )}
        {isEditing && (
          <>
            <div className="flex flex-col">
              {currentErrors[0] && (
                <Typography
                  variant="label4-r"
                  styles={'text-red-500'}
                  component="span"
                >
                  {t('form.errorMessages.strAboveLimit', {
                    limit: maxPointsFormatted,
                  })}
                </Typography>
              )}
              {currentErrors[1] && (
                <Typography
                  variant="label4-r"
                  styles={'text-red-500'}
                  component="span"
                >
                  {t('form.errorMessages.agiAboveLimit', {
                    limit: maxPointsFormatted,
                  })}
                </Typography>
              )}
              {currentErrors[2] && (
                <Typography
                  variant="label4-r"
                  styles={'text-red-500'}
                  component="span"
                >
                  {t('form.errorMessages.vitAboveLimit', {
                    limit: maxPointsFormatted,
                  })}
                </Typography>
              )}
              {currentErrors[3] && (
                <Typography
                  variant="label4-r"
                  styles={'text-red-500'}
                  component="span"
                >
                  {t('form.errorMessages.eneAboveLimit', {
                    limit: maxPointsFormatted,
                  })}
                </Typography>
              )}
              {currentErrors[4] && (
                <Typography
                  variant="label4-r"
                  styles={'text-red-500'}
                  component="span"
                >
                  {t('form.errorMessages.cmdAboveLimit', {
                    limit: maxPointsFormatted,
                  })}
                </Typography>
              )}
              {currentErrors[5] && (
                <Typography
                  variant="label4-r"
                  styles={'text-red-500'}
                  component="span"
                >
                  {t('form.errorMessages.pointsAboveLimit', {
                    limit: numberFormat.format(character.levelUpPoints),
                  })}
                </Typography>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                variant="bezel"
                form="attributesForm"
                onClick={handleSubmit(onSubmit)}
              >
                {t('form.saveButton')}
              </Button>
              <Button variant="outline" onClick={onCancel}>
                {t('form.cancelButton')}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Attributes;

import React, { useState, useEffect, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import List from '@/components/List/List';

type EventCountdownProps = {
  label: string;
  intervalHours?: number;
  startHour?: string;
  openDurationMinutes: number;
  times?: string[];
};

const EventCountdown: React.FC<EventCountdownProps> = ({
  label,
  intervalHours,
  startHour = '00:00',
  openDurationMinutes,
  times,
}) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const { t } = useTranslation();

  const nowTranslation = t('home.eventCard.countdown.now');

  const calculateTimeRemaining = useCallback(() => {
    const now = new Date();
    const utcNow = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
      ),
    );

    const currentMinutes = utcNow.getUTCMinutes();
    const currentHours = utcNow.getUTCHours();

    if (times && times.length > 0) {
      for (const time of times) {
        const [hour, _] = time.split(':').map(Number);
        if (currentHours === hour && currentMinutes < openDurationMinutes) {
          return nowTranslation;
        }
      }
    } else {
      const [startHourHours, _] = startHour.split(':').map(Number);
      const eventHour =
        Math.floor(
          (currentHours - startHourHours) / (intervalHours as number),
        ) *
          (intervalHours as number) +
        startHourHours;

      if (currentHours === eventHour && currentMinutes < openDurationMinutes) {
        return nowTranslation;
      }
    }

    let nextEventTime = utcNow;

    if (times && times.length > 0) {
      let nextTime = null;
      for (const time of times) {
        const [hour, minute] = time.split(':').map(Number);
        const eventTime = utcNow;
        eventTime.setUTCHours(hour);
        eventTime.setUTCMinutes(minute);
        eventTime.setUTCSeconds(0);
        eventTime.setUTCMilliseconds(0);

        if (eventTime > now) {
          nextTime = eventTime;
          break;
        }
      }

      if (!nextTime) {
        nextTime = nextEventTime;
        const [firstHour, firstMinute] = times[0].split(':').map(Number);
        nextTime.setUTCDate(nextTime.getUTCDate() + 1);
        nextTime.setUTCHours(firstHour);
        nextTime.setUTCMinutes(firstMinute);
        nextTime.setUTCSeconds(0);
        nextTime.setUTCMilliseconds(0);
      }

      nextEventTime = nextTime;
    } else if (intervalHours) {
      const [startHourHours, startHourMinutes] = startHour
        .split(':')
        .map(Number);
      let nextEventHour =
        Math.ceil((currentHours - startHourHours) / intervalHours) *
          intervalHours +
        startHourHours;

      if (nextEventHour <= currentHours) {
        nextEventHour += intervalHours;
      }

      nextEventTime.setUTCHours(nextEventHour);
      nextEventTime.setUTCMinutes(startHourMinutes);
      nextEventTime.setUTCSeconds(0);
      nextEventTime.setUTCMilliseconds(0);

      if (nextEventTime <= now) {
        nextEventTime.setUTCHours(nextEventTime.getUTCHours() + intervalHours);
      }
    }

    const timeDifference = nextEventTime.getTime() - now.getTime();
    const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesRemaining = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (hoursRemaining > 0) {
      return `${hoursRemaining}h ${minutesRemaining}m`;
    } else {
      return `${minutesRemaining}m ${secondsRemaining}s`;
    }
  }, [times, intervalHours, openDurationMinutes]);

  useEffect(() => {
    const updateTime = () => {
      setTimeRemaining(calculateTimeRemaining());
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [calculateTimeRemaining]);

  return (
    <>
      <List.Item
        label={label}
        value={
          timeRemaining === nowTranslation ? (
            <strong className="font-semibold">{nowTranslation}</strong>
          ) : (
            timeRemaining
          )
        }
      />
    </>
  );
};

export default EventCountdown;

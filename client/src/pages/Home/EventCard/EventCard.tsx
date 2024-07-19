import React from 'react';

import { useTranslation } from 'react-i18next';

import List from '@/components/List/List';
import EventCountdown from './EventCountdown';

type EventCardProps = Record<string, never>;

const EventCard: React.FC<EventCardProps> = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="grid w-full items-center rounded-lg border border-primary-200 bg-primary-50 px-12 py-14 dark:border-primary-900 dark:bg-primary-800/20">
        <List>
          <List.Item label="Blood Castle" value={t('home.eventCard.soon')} />
          <List.Item label="Devil Square" value={t('home.eventCard.soon')} />
          <EventCountdown
            label="Chaos Castle"
            intervalHours={1}
            openDurationMinutes={5}
          />
          <EventCountdown
            label="Golden Invasion"
            openDurationMinutes={5}
            startHour="00:00"
            intervalHours={4} // times={['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']}
          />
          <EventCountdown
            label="Red Invasion"
            openDurationMinutes={5}
            startHour="02:00"
            intervalHours={6} // times={['02:00', '08:00', '14:00', '20:00']}
          />
          <EventCountdown
            label="Happy Hour"
            openDurationMinutes={60}
            startHour="00:00"
            intervalHours={6} // times={['00:00', '06:00', '12:00', '18:00']}
          />
        </List>
      </div>
    </>
  );
};

export default EventCard;

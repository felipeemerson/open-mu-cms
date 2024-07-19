import React from 'react';

type OnlineCircleProps = { isOnline: boolean };

const OnlineCircle: React.FC<OnlineCircleProps> = ({ isOnline }) => {
  return (
    <>
      <div
        className={`mx-auto size-4 rounded-full bg-gradient-to-b ${
          isOnline
            ? 'animate-pulse-online from-green-400 via-green-600 to-green-800'
            : 'from-red-400 via-red-600 to-red-800'
        }`}
      />
    </>
  );
};

export default OnlineCircle;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Banner } from '@/api/types';

type ImageSliderProps = { banners: Banner[] };
type ImageProps = { src: string; onImageChange: () => void };
type ImageSliderState = number;

const Image: React.FC<ImageProps> = ({ src, onImageChange }) => {
  const timeToChangeInMs = 4000;

  useEffect(() => {
    const timer = setTimeout(onImageChange, timeToChangeInMs);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <img
        className="z-[-1] inline-block h-full w-full rounded-lg object-cover"
        src={src}
      />
      <div className="absolute inset-0 top-0 rounded-lg bg-gradient-to-t from-[rgba(255,255,255,0.5)] via-transparent to-transparent dark:bg-none" />
    </>
  );
};

const ImageSlider: React.FC<ImageSliderProps> = ({ banners }) => {
  const [currentBannerIndex, setCurrentBannerIndex] =
    useState<ImageSliderState>(0);
  const sortedBanners = banners.sort((a, b) => a.orderIndex - b.orderIndex);
  const numberOfBanners = sortedBanners.length;
  const currentBanner = sortedBanners[currentBannerIndex];

  const handleImageChange = () => {
    const nextImgIndex = currentBannerIndex + 1;
    nextImgIndex >= numberOfBanners
      ? setCurrentBannerIndex(0)
      : setCurrentBannerIndex(nextImgIndex);
  };

  const handleClick = (index: number) => {
    if (index !== currentBannerIndex) {
      setCurrentBannerIndex(index);
    }
  };

  return (
    <>
      <div className="relative inline-block h-[200px] md:h-[300px]">
        {currentBanner.hasLink && currentBanner.isExternalLink && (
          <a
            href={currentBanner.link as string}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={currentBanner.imageUrl}
              onImageChange={handleImageChange}
            />
          </a>
        )}
        {currentBanner.hasLink && !currentBanner.isExternalLink && (
          <Link to={currentBanner.link as string}>
            <Image
              src={currentBanner.imageUrl}
              onImageChange={handleImageChange}
            />
          </Link>
        )}
        {!currentBanner.hasLink && (
          <Image
            src={currentBanner.imageUrl}
            onImageChange={handleImageChange}
          />
        )}

        <ul className="absolute left-[calc(50%-26px)] top-[164.98px] -z-0 flex gap-2 md:top-[264.98px]">
          {banners.map((_, index) => (
            <li
              key={index}
              onClick={() => handleClick(index)}
              className={`size-3 rounded-full ${
                index === currentBannerIndex
                  ? 'bg-primary-500'
                  : 'cursor-pointer bg-primary-300 hover:bg-primary-400'
              }`}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ImageSlider;

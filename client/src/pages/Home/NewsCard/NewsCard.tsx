import React from 'react';
import { useNavigate } from 'react-router-dom';

import type { News } from '@/api/types';
import { useTranslation } from 'react-i18next';

import Typography from '../../../components/Typography/Typography';
import Button from '../../../components/Button/Button';
import NewsHtmlContainer from '../../../components/NewsHtmlContainer/NewsHtmlContainer';
import DOMPurify from 'dompurify';

type NewsCardProps = { news: News };

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onClick = () => {
    navigate(`/news/#${news.id}`);
  };

  const LINE_CHAR_LIMIT = 57;
  const MAX_LINES = 4;

  const parser = new DOMParser();
  const doc = parser.parseFromString(news.content, 'text/html');

  const elementsToRemove = doc.querySelectorAll(
    'img, table, ul, ol, figure, p:empty',
  );
  elementsToRemove.forEach((el) => el.remove());

  const allowedElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6, p');

  let visibleLines = 0;
  let shortenedContent = '';
  let hasHeading = false;

  allowedElements.forEach((el) => {
    if (visibleLines >= MAX_LINES) return;

    const textContent = el.textContent?.trim();
    const lines = Math.ceil((textContent?.length || 0) / LINE_CHAR_LIMIT);

    if (!hasHeading && el.tagName.match(/^H[1-6]$/)) {
      hasHeading = true;
      const linesToAdd = Math.min(lines, MAX_LINES - visibleLines);
      visibleLines += linesToAdd;

      let truncatedText = textContent?.slice(0, linesToAdd * LINE_CHAR_LIMIT);
      if (linesToAdd < lines) truncatedText += '...';

      shortenedContent += `<h4>${truncatedText}</h4>`;
    } else if (hasHeading && el.tagName === 'P') {
      const remainingLines = MAX_LINES - visibleLines;
      if (remainingLines <= 0) return;

      const linesToAdd = Math.min(lines, remainingLines);
      visibleLines += linesToAdd;

      let truncatedText = textContent?.slice(0, linesToAdd * LINE_CHAR_LIMIT);
      if (linesToAdd < lines) truncatedText += '...';

      shortenedContent += `<p>${truncatedText}</p>`;
    } else if (!hasHeading && el.tagName === 'P') {
      const linesToAdd = Math.min(lines, MAX_LINES - visibleLines);
      visibleLines += linesToAdd;

      let truncatedText = textContent?.slice(0, linesToAdd * LINE_CHAR_LIMIT);
      if (linesToAdd < lines) truncatedText += '...';

      shortenedContent += `<p>${truncatedText}</p>`;
    }
  });

  return (
    <section className="flex w-full snap-center flex-col justify-between gap-4 scroll-smooth rounded-lg border border-primary-200 bg-primary-50 p-4 dark:border-primary-900 dark:bg-primary-800/20 md:w-1/2">
      <div className="flex justify-between">
        <Typography
          component="h3"
          variant="h4"
          styles="text-primary-900 dark:text-primary-100 flex-grow"
        >
          {news.title}
        </Typography>
        <Typography component="span" variant="h5" styles="text-primary-400">
          {new Date(news.creationDate).toLocaleDateString('pt-BR')}
        </Typography>
      </div>
      <NewsHtmlContainer>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(shortenedContent, {
              USE_PROFILES: { html: true },
            }),
          }}
        />
      </NewsHtmlContainer>
      <Button variant="outline" styles="self-end" onClick={onClick}>
        {t('home.newsReadMoreButton')}
      </Button>
    </section>
  );
};

export default NewsCard;

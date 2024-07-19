import React, { createRef, useCallback, useEffect } from 'react';

import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

import LoginForm from '../../LoginForm/LoginForm';
import Typography from '../../Typography/Typography';
import Button from '../../Button/Button';

type MobileLoginDialogProps = {
  onClose: () => void;
};

const MobileLoginDialog: React.FC<MobileLoginDialogProps> = ({ onClose }) => {
  const dialogRef = createRef<HTMLDialogElement>();
  const { t } = useTranslation();
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      event.stopImmediatePropagation();
      if (dialogRef && !dialogRef?.current?.contains(event.target as Node)) {
        onClose();
      }
    },
    [dialogRef, onClose],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-25" />
        <dialog
          ref={dialogRef}
          open
          tabIndex={-1}
          className="fixed z-20 max-w-72 origin-center transform animate-scale rounded-lg border border-primary-200 bg-primary-50 p-6 outline-none dark:border-primary-900 dark:bg-neutral-900"
        >
          <div className="mb-2 flex place-items-center justify-between">
            <Typography
              component="h1"
              variant="h3-inter"
              styles="text-primary-950 dark:text-primary-50"
            >
              {t('sidebar.loginCard.title')}
            </Typography>
            <Button
              variant="ghost1"
              icon={<MdClose className="size-6" />}
              onClick={onClose}
            />
          </div>
          <LoginForm onSubmitSuccess={onClose} />
        </dialog>
      </div>
    </>
  );
};

export default MobileLoginDialog;

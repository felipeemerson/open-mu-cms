import React, { createRef, useEffect } from 'react';

import { MdClose } from 'react-icons/md';
import useBaseTranslation from '@/hooks/use-base-translation';

import Typography from '@/components/Typography/Typography';
import Button from '@/components/Button/Button';
import ChangePasswordForm from './ChangePasswordForm';

type ChangePasswordModalProps = {
  onClose: () => void;
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  onClose,
}) => {
  const { t } = useBaseTranslation('account.changePasswordModal');
  const dialogRef = createRef<HTMLDialogElement>();
  const handleClickOutside = (event: MouseEvent) => {
    event.stopImmediatePropagation();
    if (dialogRef && !dialogRef?.current?.contains(event.target as Node)) {
      onClose();
    }
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
          className="fixed z-20 max-w-72 origin-center transform animate-scale rounded-lg border border-primary-200 bg-primary-50 p-6 outline-none dark:border-primary-900 dark:bg-neutral-900 md:max-w-96"
        >
          <div className="mb-4 flex place-items-center justify-between">
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
          <ChangePasswordForm onClose={onClose} />
        </dialog>
      </div>
    </>
  );
};

export default ChangePasswordModal;

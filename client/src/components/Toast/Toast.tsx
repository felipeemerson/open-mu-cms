import React, { useEffect, useContext } from 'react';

import { ToastContext } from '@/contexts/ToastContext';

import Alert from '../Alert/Alert';

type ToastProps = {};

const Toast: React.FC<ToastProps> = () => {
  const {
    toast: { open, duration, message, severity },
    closeToast,
  } = useContext(ToastContext);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      closeToast();
    }, duration);
    return () => clearTimeout(timer);
  }, [open, duration, closeToast]);

  return (
    <>
      {open && (
        <dialog
          open={true}
          tabIndex={-1}
          className="fixed bottom-4 z-20 origin-bottom animate-slide-up"
        >
          <Alert
            severity={severity}
            message={message}
            onClose={() => closeToast()}
            withClose
            styles="border"
          />
        </dialog>
      )}
    </>
  );
};

export default Toast;

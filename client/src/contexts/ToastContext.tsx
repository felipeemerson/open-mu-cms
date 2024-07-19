import { createContext, ReactNode, useContext, useState } from 'react';

import { AlertSeverityLevel } from '@/components/Alert/Alert';

export type ToastState = {
  open: boolean;
  message: string;
  duration: number;
  severity: AlertSeverityLevel;
};

type ToastContextState = {
  toast: ToastState;
  closeToast: () => void;
  openToast: {
    success: (message: string, duration?: number) => void;
    info: (message: string, duration?: number) => void;
    error: (message: string, duration?: number) => void;
    warning: (message: string, duration?: number) => void;
  };
};

const INITIAL_TOAST_STATE: ToastState = {
  open: false,
  message: '',
  duration: 4000,
  severity: AlertSeverityLevel.ERROR,
};

const INITIAL_CONTEXT_STATE: ToastContextState = {
  toast: INITIAL_TOAST_STATE,
  closeToast: () => {},
  openToast: {
    success: () => {},
    error: () => {},
    warning: () => {},
    info: () => {},
  },
};

export const ToastContext: React.Context<ToastContextState> = createContext(
  INITIAL_CONTEXT_STATE,
);

type ToastProviderProps = {
  children: ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState(INITIAL_TOAST_STATE);

  const generateOpenSnackbarFunction = (severity: AlertSeverityLevel) => {
    return (message: string, duration: number = 4000) => {
      setToast({
        open: true,
        message,
        duration,
        severity: severity,
      });
    };
  };

  const openToast = {
    error: generateOpenSnackbarFunction(AlertSeverityLevel.ERROR),
    success: generateOpenSnackbarFunction(AlertSeverityLevel.SUCCESS),
    info: generateOpenSnackbarFunction(AlertSeverityLevel.INFO),
    warning: generateOpenSnackbarFunction(AlertSeverityLevel.WARNING),
  };

  const closeToast = () => {
    setToast({
      ...toast,
      open: false,
      message: '',
    });
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        closeToast,
        openToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};

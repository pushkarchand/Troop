/* eslint-disable no-unused-vars */
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import React, { ReactNode, createContext, useContext, useState } from 'react';

interface SnackbarContextType {
  openSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);
interface SnackbarProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<
    'success' | 'error' | 'warning' | 'info'
  >('success');

  const openSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={open}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1000}
      >
        <Alert
          onClose={closeSnackbar}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

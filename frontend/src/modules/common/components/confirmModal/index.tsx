import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  confirm: () => void;
  close: () => void;
};

export default function ConfirmModal(props: ConfirmModalProps) {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
    return () => {
      setOpen(false);
    };
  }, [props.open]);

  const handleClose = () => {
    console.log('handle');
    setOpen(false);
    props.close();
  };

  const handleConfirm = () => {
    console.log('handle confirm');
    props.confirm();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleConfirm}
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

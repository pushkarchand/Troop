import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { ISignupValidation, SignUpPayload } from '../types';
import {
  confirmPasswordValidationMsg,
  emailPattern,
  emailValidationMsg,
  passwordPattern,
  passwordValidationMsg,
} from '../utils';
import { useMainContext } from '@context/maincontext';

type CreateProps = {
  open: boolean;
  title: string;
  isEdit?: boolean;
  item?: SignUpPayload;
  close: () => void;
  create: (value: SignUpPayload) => void;
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;
const CreateForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function CreateEditUser({
  open,
  title,
  item,
  close,
  create,
}: CreateProps) {
  const [validation, setValidation] = useState<ISignupValidation>({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    role: null,
  });
  const [user, setUser] = useState<SignUpPayload>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    type: 'EDITOR',
  });

  useEffect(() => {
    if (item) {
      setUser({
        email: item.email,
        password: item.password,
        confirmPassword: item.password,
        firstName: item.firstName,
        lastName: item.lastName,
        type: item.type,
      });
    }
  }, [item]);

  const saveChanges = () => {
    create(user);
  };

  const handleChangeInUser = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    switch (event.target.name) {
      case 'email':
        if (emailPattern.test(event.target.value)) {
          setValidation({ ...validation, email: null });
        } else {
          setValidation({ ...validation, email: emailValidationMsg });
        }
        break;
      case 'firstName':
        if (event.target.value.trim()) {
          setValidation({ ...validation, firstName: null });
        } else {
          setValidation({ ...validation, firstName: 'First name is required' });
        }
        break;
      case 'password':
        if (user.confirmPassword.trim()) {
          if (user.confirmPassword === event.target.value) {
            setValidation({
              ...validation,
              password: null,
              confirmPassword: null,
            });
          } else {
            if (passwordPattern.test(event.target.value)) {
              setValidation({
                ...validation,
                password: 'The pasword and confirm password must be same',
              });
            } else {
              setValidation({ ...validation, password: passwordValidationMsg });
            }
          }
        } else {
          if (passwordPattern.test(event.target.value)) {
            setValidation({ ...validation, password: null });
          } else {
            setValidation({ ...validation, password: passwordValidationMsg });
          }
        }
        break;
      case 'confirmPassword':
        if (user.password.trim()) {
          if (user.password === event.target.value) {
            setValidation({
              ...validation,
              password: null,
              confirmPassword: null,
            });
          } else {
            if (passwordPattern.test(event.target.value)) {
              setValidation({
                ...validation,
                confirmPassword:
                  'The pasword and confirm password must be same',
              });
            } else {
              setValidation({
                ...validation,
                confirmPassword: confirmPasswordValidationMsg,
              });
            }
          }
        } else {
          if (passwordPattern.test(event.target.value)) {
            setValidation({ ...validation, confirmPassword: null });
          } else {
            setValidation({
              ...validation,
              confirmPassword: confirmPasswordValidationMsg,
            });
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'sm'}
      open={open}
      onClose={(event: object, reason: string) => {
        if (reason !== 'backdropClick') {
          close();
        }
      }}
      disableEscapeKeyDown
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box>
          <CreateForm>
            <TextField
              error={!!validation.firstName}
              helperText={validation.firstName}
              label="First Name"
              variant="outlined"
              name="firstName"
              required
              value={user.firstName}
              onChange={handleChangeInUser}
            />
            <TextField
              error={!!validation.lastName}
              helperText={validation.lastName}
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={user.lastName}
              onChange={handleChangeInUser}
            />
            <TextField
              error={!!validation.email}
              helperText={validation.email}
              label="Email"
              variant="outlined"
              name="email"
              required
              value={user.email}
              onChange={handleChangeInUser}
            />
            <TextField
              error={!!validation.password}
              helperText={validation.password}
              label="Password"
              variant="outlined"
              type={'password'}
              placeholder="Password"
              required
              name="password"
              value={user.password}
              disabled={!!item}
              onChange={handleChangeInUser}
            />
            <TextField
              error={!!validation.confirmPassword}
              helperText={validation.confirmPassword}
              label=" Confirm Password"
              variant="outlined"
              type={'password'}
              required
              name="confirmPassword"
              disabled={!!item}
              value={user.confirmPassword}
              onChange={handleChangeInUser}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-role">Role</InputLabel>
              <Select
                labelId="demo-simple-select-role"
                id="demo-simple-select"
                value={user.type}
                label="Role"
                placeholder="Role"
                onChange={(event) => {
                  setUser({ ...user, type: event.target.value });
                }}
              >
                <MenuItem value={'ADMIN'}>Admin</MenuItem>
                <MenuItem value={'EDITOR'}>Editor</MenuItem>
                <MenuItem value={'VIEWER'}>Viewer</MenuItem>
              </Select>
            </FormControl>
          </CreateForm>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={
            !!validation.email ||
            !user.email.trim() ||
            !!validation.password ||
            !user.password.trim() ||
            !!validation.confirmPassword ||
            !user.confirmPassword.trim() ||
            !user.type.trim() ||
            !!validation.firstName ||
            !user.firstName.trim()
          }
          onClick={saveChanges}
        >
          Save
        </Button>
        <Button variant="outlined" onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

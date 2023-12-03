import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CreatePayload } from 'src/types/project';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';

type CreateProps = {
  open: boolean;
  title: string;
  isEdit?: boolean;
  item?: CreatePayload;
  close: () => void;
  create: (value: CreatePayload) => void;
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;

export default function EditCreateModal({
  open,
  title,
  item,
  close,
  create,
}: CreateProps) {
  const [genericField, setGenericField] = React.useState<CreatePayload>({
    name: item?.name || '',
    description: item?.description || '',
  });
  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGenericField({ ...genericField, [e.target.name]: e.target.value });
  };

  const createNewgenericField = () => {
    create(genericField);
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
          <TextField
            id="generic-name"
            required
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={genericField.name}
            onChange={handleValueChange}
          />
          <TextField
            id="generic-description"
            label="Description"
            placeholder="Description"
            multiline
            variant="outlined"
            fullWidth
            name="description"
            value={genericField.description}
            onChange={handleValueChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={!genericField.name}
          onClick={createNewgenericField}
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

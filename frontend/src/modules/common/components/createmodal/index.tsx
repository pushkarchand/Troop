import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { CreatePayload } from 'src/types/project';
import { TextField } from '@mui/material';
import { useState } from 'react';

type CreateProps = {
  open: boolean;
  title: string;
  close: () => void;
  create: (value: CreatePayload) => void;
};

export default function CreateModal({
  open,
  title,
  close,
  create,
}: CreateProps) {
  const [project, setProject] = useState<CreatePayload>({
    name: '',
    description: '',
  });

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const createNewProject = () => {
    create(project);
  };

  return (
    <Dialog fullWidth={true} maxWidth={'sm'} open={open} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '20px 0',
          }}
        >
          <TextField
            id="project-name"
            required
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            onChange={handleValueChange}
          />
          <TextField
            id="project-description"
            label="Description"
            placeholder="Description"
            multiline
            variant="outlined"
            fullWidth
            name="description"
            onChange={handleValueChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={!project.name}
          onClick={createNewProject}
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

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { User } from '../types';
import { convertDateString } from '../utils';
import MoreOption from '@modules/common/components/moreoption';
import { Action, Option } from '@datatypes/common';
import { useMainContext } from '@context/maincontext';

const Options: Option[] = [
  { label: 'Edit', value: Action.EDIT },
  { label: 'Delete', value: Action.DELETE },
];

interface Column {
  id:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'type'
    | 'createdAt'
    | 'updatedAt'
    | 'action';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: 'firstName', label: 'First Name', minWidth: 100 },
  { id: 'lastName', label: 'Last Name', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 100,
  },
  {
    id: 'type',
    label: 'Role',
    minWidth: 100,
    align: 'right',
    format: (value: string) =>
      value === 'ADMIN' ? 'Admin' : value === 'EDITOR' ? 'Editor' : 'Viewer',
  },
  {
    id: 'createdAt',
    label: 'Created on',
    minWidth: 100,
    format: (value: string) => convertDateString(value),
  },
  {
    id: 'updatedAt',
    label: 'Updated on',
    minWidth: 100,
    format: (value: string) => convertDateString(value),
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100,
  },
];

type UserTableProps = {
  users: User[];
  deletUser: (user: User) => void;
  editUser: (user: User) => void;
};

export default function UsersTable({
  users,
  editUser,
  deletUser,
}: UserTableProps) {
  const { user: currentUser } = useMainContext();
  const handleActionClick = (action: string, item: User) => {
    if (action === Action.EDIT) {
      editUser(item);
    } else {
      deletUser(item);
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 100px)' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={user.localId}
                >
                  {columns.map((column) => {
                    if (column.id !== 'action') {
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {user.type !== 'ADMIN' ||
                          currentUser?.id !== user._id ? (
                            <MoreOption
                              options={Options}
                              handleClick={(value: string) => {
                                handleActionClick(value, user);
                              }}
                            />
                          ) : null}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

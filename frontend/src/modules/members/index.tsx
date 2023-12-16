import React, { useEffect, useState } from 'react';
import MainNavigation from '@modules/common/components/mainnavigation';
import styled from '@emotion/styled';
import { deleteSafe, getSafe, post, putSafe } from '@api/safe';
import Table from './components/table';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { SignUpPayload, User } from './types';
import CreateEditUser from './components/createedituser';
import { useMainContext } from '@context/maincontext';
import ConfirmModal from '@modules/common/components/confirmModal';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '@modules/common/components/snackbar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 100%;
  flex-direction: column;
  padding: 20px 30px;
  gap: 20px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: flex-star;
`;

const MembersLanding = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const { setLoading, user } = useMainContext();
  const [membersList, setMembersList] = useState<User[]>([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [editableUser, seteditableUser] = useState<User | null>(null);
  const [deletableUser, setDeletableUser] = useState<User | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (user?.type !== 'VIEWER') {
      fetchMembers();
    } else {
      navigate('/');
    }
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await getSafe('/api/users');
      setMembersList(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const createNewUser = async (user: SignUpPayload) => {
    try {
      setIsCreatingUser(false);
      setLoading(true);
      const payload = { ...user, phone: '' };
      await post('/signup', payload);
      openSnackbar(
        `Successfully added "${payload.firstName} ${payload.lastName}" member`,
        'success'
      );
      fetchMembers();
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  const editUser = (user: User) => {
    seteditableUser(user);
  };

  const deletUser = (user: User) => {
    setDeletableUser(user);
    setDeleteConfirm(true);
  };

  const deleteSelectedUser = async () => {
    try {
      if (deletableUser) {
        setDeleteConfirm(false);
        setLoading(true);
        deletableUser._id;
        await deleteSafe(`/api/users/${deletableUser._id}`);
        openSnackbar(
          `Successfully removed "${deletableUser.firstName} ${deletableUser.lastName}" member`,
          'success'
        );
        setDeletableUser(null);
        fetchMembers();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateuser = async (user: SignUpPayload) => {
    try {
      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        email: user.email,
        id: editableUser?._id,
      };
      seteditableUser(null);
      setLoading(true);
      const response = await putSafe('/api/users', payload);
      openSnackbar(
        `Successfully updated "${response.firstName} ${response.lastName}" member`,
        'success'
      );
      fetchMembers();
    } catch (error: any) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <MainNavigation showProjects={false} />
      <MainContainer>
        <HeaderRow>
          <Button
            variant="contained"
            startIcon={<Add />}
            size="small"
            onClick={() => {
              setIsCreatingUser(true);
            }}
            sx={{ borderRadius: 20 }}
          >
            Add new member
          </Button>
        </HeaderRow>
        <Table users={membersList} deletUser={deletUser} editUser={editUser} />
        {isCreatingUser ? (
          <CreateEditUser
            open={isCreatingUser}
            title="Add new member"
            close={() => {
              setIsCreatingUser(false);
            }}
            create={createNewUser}
          />
        ) : null}
        {editableUser ? (
          <CreateEditUser
            open={!!editableUser}
            title="Edit member"
            close={() => {
              seteditableUser(null);
            }}
            create={updateuser}
            item={{
              email: editableUser.email,
              password: 'DUMMYPASSOWRD',
              confirmPassword: 'DUMMYPASSOWRD',
              firstName: editableUser.firstName,
              lastName: editableUser.lastName,
              type: editableUser.type,
            }}
            isEdit={true}
          />
        ) : null}
        {deleteConfirm && deletableUser ? (
          <ConfirmModal
            open={!!deletableUser}
            title={'Delete member'}
            message={`Are you sure you want to delete "${deletableUser.firstName} ${deletableUser.lastName}" member`}
            confirm={deleteSelectedUser}
            close={() => {
              setDeleteConfirm(false);
            }}
          />
        ) : null}
      </MainContainer>
    </Container>
  );
};

export default MembersLanding;

import React, { useState } from 'react';
import styled from '@emotion/styled';
import color from '@utils/styles/color';
import SectionComponent from './section';
import spacing from '@utils/styles/spacing';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import { CreatePayload, Section } from '@datatypes/project';
import CreateEditSection from '../editcreatemodal';
import { deleteSafe, post, putSafe } from '@api/safe';
import { useSnackbar } from '../snackbar';
import ConfirmModal from '../confirmModal';

type SectionProps = {
  sections: Section[];
  projectId: string;
  updateDetails: () => void;
  changeInPage: (id: string) => void;
};

// styled componets
const Container = styled.div`
  display: flex;
  flex: 1 1 0;
  padding: ${spacing.small}px 0 60px ${spacing.small}px;
  box-sizing: content-box;
  overflow-y: auto;
  width: 250px;
  max-width: 250px;
  background-color: ${color.gray50};
`;

const SectionsConationer = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  padding: ${spacing.small}px;
  gap: ${spacing.medium}px;
`;

const AddNewSction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center
  margin: ${spacing.medium}px 0;
`;

const SideBar = ({
  sections,
  projectId,
  updateDetails,
  changeInPage,
}: SectionProps) => {
  const { openSnackbar } = useSnackbar();
  const [isCreateSection, setIsCreateSection] = useState(false);
  const [editedSection, setEditedSection] = useState<Section | null>(null);
  const [deletedSection, setDeletedSection] = useState<Section | null>(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const createNewSection = async (payload: CreatePayload) => {
    try {
      const createPagePayload = { ...payload, projectId };
      await post('/api/sections', createPagePayload);
      setIsCreateSection(false);
      updateDetails();
    } catch (error: any) {
      console.log(error);
      setIsCreateSection(false);
    }
  };

  const handleEdit = (item: Section) => {
    setEditedSection(item);
  };

  const deleteSection = (item: Section) => {
    setConfirmModalOpen(true);
    setDeletedSection(item);
  };

  const editSelectedSection = async (item: CreatePayload) => {
    try {
      const payload = {
        id: editedSection?._id,
        name: item.name,
        description: item.description,
        pages: editedSection?.pages.map((page) => page._id),
      };
      setEditedSection(null);
      const response = await putSafe('/api/sections', payload);
      openSnackbar(`Successfully updated ${response.name}`, 'success');
      updateDetails();
    } catch (error) {
      setEditedSection(null);
      console.log(error);
    }
  };

  const handleConfirmDelte = async () => {
    try {
      setDeletedSection(null);
      const response = await deleteSafe(`/api/sections/${deletedSection?._id}`);
      openSnackbar(
        `Successfully deleted section "${response.name}"`,
        'success'
      );
      updateDetails();
    } catch (error) {
      setDeletedSection(null);
      console.log(error);
    }
  };

  return (
    <Container>
      <SectionsConationer>
        <AddNewSction>
          <Button
            variant="contained"
            startIcon={<Add />}
            size="small"
            onClick={() => {
              setIsCreateSection(true);
            }}
            sx={{ borderRadius: 20 }}
          >
            Add new
          </Button>
        </AddNewSction>
        <>
          {sections &&
            sections.map((item) => (
              <SectionComponent
                item={item}
                key={item._id}
                updateDetails={updateDetails}
                changeInPage={changeInPage}
                editSection={handleEdit}
                deleteSection={deleteSection}
              />
            ))}
        </>
      </SectionsConationer>
      {isCreateSection ? (
        <CreateEditSection
          open={isCreateSection}
          close={() => {
            setIsCreateSection(false);
          }}
          create={createNewSection}
          title={'Create Section'}
        />
      ) : null}

      {editedSection ? (
        <CreateEditSection
          open={!!editedSection}
          close={() => {
            setEditedSection(null);
          }}
          create={editSelectedSection}
          title={'Edit Section'}
          isEdit={true}
          item={{
            name: editedSection.name,
            description: editedSection.description,
          }}
        />
      ) : null}

      {deletedSection && confirmModalOpen ? (
        <ConfirmModal
          open={confirmModalOpen}
          title="Are you sure?"
          message={`Want to delete "${deleteSection?.name}" section`}
          close={() => {
            setConfirmModalOpen(false);
            setDeletedSection(null);
          }}
          confirm={handleConfirmDelte}
        />
      ) : null}
    </Container>
  );
};

export default SideBar;

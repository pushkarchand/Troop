import React, { useState } from 'react';
import styled from '@emotion/styled';
import color from '@utils/styles/color';
import SectionComponent from './section';
import spacing from '@utils/styles/spacing';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import { CreatePayload, Section } from '@datatypes/project';
import CreateModal from '../createmodal';
import { post } from '@api/safe';

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

const SideBar = ({ sections, projectId, updateDetails, changeInPage }: SectionProps) => {
  const [isCreateSection, setIsCreateSection] = useState(false);

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
              />
            ))}
        </>
      </SectionsConationer>
      {isCreateSection ? (
        <CreateModal
          open={isCreateSection}
          close={() => {
            setIsCreateSection(false);
          }}
          create={createNewSection}
          title={'Create Section'}
        />
      ) : null}
    </Container>
  );
};

export default SideBar;

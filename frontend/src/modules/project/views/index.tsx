import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MainNavigation from '@modules/common/components/mainnavigation';
import SideBar from '@modules/common/components/sidebar';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import BasicTabs from '../components/tabs';
import { getSafe } from '@api/safe';
import { Project } from '@datatypes/project';

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
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${spacing.small}px ${spacing.large}px;
  box-sizing: border-box;
  gap: ${spacing.small}px;
`;

const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 250px);
`;

const BorderlessInput = styled.input`
  border: none;
  outline: none;
  padding: 8px;
  font-size: 24px;
`;

const BorderlessTextarea = styled.textarea`
  border: none;
  outline: none;
  padding: 8px;
`;

const ProjectLanding = () => {
  const [name, setName] = useState('Button');
  const [description, setDescription] = useState('');
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
    } else {
      navigate('/');
    }
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const response = await getSafe(`/api/projects/${projectId}`);
      setProjectDetails({ ...response });
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Container>
      <MainNavigation />
      <MainContainer>
        <SideBar
          sections={projectDetails?.sections || []}
          projectId={projectDetails?._id || ''}
          updateDetails={fetchProjectDetails}
        />
        <CenterSection>
          <HeaderSection>
            <BorderlessInput
              placeholder="Page"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <BorderlessTextarea
              placeholder="Add description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </HeaderSection>
          <BasicTabs />
        </CenterSection>
      </MainContainer>
    </Container>
  );
};

export default ProjectLanding;

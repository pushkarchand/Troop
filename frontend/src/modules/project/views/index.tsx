import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MainNavigation from '@modules/common/components/mainnavigation';
import SideBar from '@modules/common/components/sidebar';
import styled from '@emotion/styled';
import { getSafe } from '@api/safe';
import { Page, Project } from '@datatypes/project';
import PageDetails from '../components/pagedetails';

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

const getCurrentPage = (
  project: Project | null,
  pageId: string | undefined
): any => {
  if (project && project.sections.length > 0 && pageId) {
    let selectedPage = null;
    project.sections.forEach((section) => {
      selectedPage = section.pages.find((item) => item.localId === pageId);
    });
    return selectedPage;
  } else {
    return null;
  }
};

const ProjectLanding = () => {
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const { projectId, pageId } = useParams();
  const [currentPage, setCurrentPage] = useState<Page | null>(
    getCurrentPage(projectDetails, pageId)
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    setCurrentPage(getCurrentPage(projectDetails, pageId));
  }, [projectDetails]);

  const changeInPage = (id: string) => {
    setCurrentPage({...getCurrentPage(projectDetails, id)});
  };

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
      <MainNavigation showProjects={true} />
      <MainContainer>
        <SideBar
          sections={projectDetails?.sections || []}
          projectId={projectDetails?._id || ''}
          updateDetails={fetchProjectDetails}
          changeInPage={changeInPage}
        />
      
        {currentPage ? <PageDetails page={currentPage} /> : null}
      </MainContainer>
    </Container>
  );
};

export default ProjectLanding;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MainNavigation from '@modules/common/components/mainnavigation';
import SideBar from '@modules/common/components/sidebar';
import styled from '@emotion/styled';
import { getSafe } from '@api/safe';
import { Page, Project, SubPage } from '@datatypes/project';
import PageDetails from '../components/pagedetails';
import EmptyPage from '../components/emptypage';
import { AppContextType, useMainContext } from '@context/maincontext';

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

const ProjectLanding = () => {
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  const { projectId, pageId, subPageId } = useParams();
  const [noSection, setNoSection] = useState(false);

  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [currentSubPage, setCurrentSubPage] = useState<SubPage | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    getCurrentPageDetails(projectDetails, pageId, subPageId);
  }, [projectDetails]);

  const changeInPage = (id: string) => {
    getCurrentPageDetails(projectDetails, id, '');
  };

  const changeInSubPage = (id: string) => {
    const subPage =
      currentPage?.subPages.find((page) => page._id === id) || null;
    if (subPage && currentPage) {
      navigate(
        `/project/${projectId}/${currentPage.localId}/${subPage.localId}`
      );
      setCurrentSubPage(subPage);
    }
  };

  function getCurrentPageDetails(
    projectData: Project | null,
    argPageId: string | undefined,
    argSubPageId: string | undefined
  ) {
    // Find the section containing the specified pageId
    const section = projectData?.sections.find((section) =>
      section.pages.some((page) => page.localId === argPageId)
    );
    if (section) {
      // If the section is found, find the specified page
      const page = section.pages.find((page) => page.localId === argPageId);

      if (page) {
        // If the page is found, find the specified subPage or select the first subPage
        const subPage = argSubPageId
          ? page.subPages.find((subPage) => subPage.localId === argSubPageId)
          : page.subPages[0];
        setCurrentSubPage(subPage || null);
        setCurrentPage(page);
        if (subPage) {
          navigate(`/project/${projectId}/${page.localId}/${subPage?.localId}`);
        }
      }
    } else {
      // If the specified pageId or subPageId is not found, select the first available section, page, and subPage
      const firstSection = projectData?.sections[0];
      const firstPage = firstSection?.pages[0];
      const firstSubPage = firstPage?.subPages[0]; // Assuming there's at least one subPage
      setCurrentPage(firstPage || null);
      setCurrentSubPage(firstSubPage || null);
      if (firstPage && firstSubPage) {
        navigate(
          `/project/${projectId}/${firstPage.localId}/${firstSubPage.localId}`
        );
      } else if (firstPage) {
        navigate(`/project/${projectId}/${firstPage.localId}`);
      } else {
        setNoSection(true);
      }
    }
  }

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
        {currentPage ? (
          <PageDetails
            page={currentPage}
            currentSubPage={currentSubPage}
            changeInSubPage={changeInSubPage}
            updateDetails={fetchProjectDetails}
          />
        ) : (
          <EmptyPage noSection={noSection} />
        )}
      </MainContainer>
    </Container>
  );
};

export default ProjectLanding;

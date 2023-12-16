import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '@modules/common/components/mainnavigation';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import { Button, css } from '@mui/material';
import { Add } from '@mui/icons-material';
import color from '@utils/styles/color';
import { templates } from '@utils/contants/designs';
import cursor from '@utils/styles/cursor';
import CreateEditProject from '../../common/components/editcreatemodal';
import { Project, CreatePayload } from '@datatypes/project';
import { deleteSafe, post, putSafe } from '@api/safe';
import text from '@utils/styles/text';
import { AppContextType, useMainContext } from '@context/maincontext';
import { useSnackbar } from '@modules/common/components/snackbar';
import ConfirmModal from '@modules/common/components/confirmModal';
import ProjectItem from '../components/projectitem';

const MainContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  padding: ${spacing.large}px 10%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WelcomeUser = styled.div`
  font-size: 22px;
  line-height: 28px;
`;

const TemplatesContainer = styled.div`
  margin: ${spacing.large}px 0;
  padding: ${spacing.medium}px;
  background-color: ${color.purple0};
  border-radius: ${spacing.xsmall}px;
`;

const SecondaryHeader = styled.h2`
  ${text.h2}
  font-weight: 500;
`;

const SubText = styled.div`
  ${text.regular}
  padding-top: ${spacing.small}px;
`;

const DesignsCOntainer = styled.div``;

const TemplatesList = styled.div`
  display: flex;
  gap: ${spacing.medium}px;
  margin: ${spacing.medium}px 0px;
`;

const CardTemplate = css`
  position: relative;
  width: 180px;
  height: 190px;
  ${cursor.pointer};
  padding: ${spacing.small}px;
  border-radius: ${spacing.small}px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Template = styled.div`
  ${CardTemplate}
  background-color: ${color.gray0};
`;

const TemplateImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: ${spacing.small}px;
`;

const Title = styled.div`
  padding: ${spacing.medium}px ${spacing.small}px;
`;

const projectAPI = '/api/projects';

const MyOverview = () => {
  const { setLoading }: any = useMainContext();
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isCreateProject, setIsCreateProject] = useState(false);
  const { user, projects, fetchProjects }: AppContextType = useMainContext();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);

  const createProject = async (project: CreatePayload) => {
    try {
      setLoading(true);
      setIsCreateProject(false);
      const respose: Project = await post(projectAPI, project);
      openSnackbar(`Successfully created ${respose.name}`, 'success');
      fetchProjects();
      setTimeout(() => {
        routeToProject(respose);
      }, 200);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const routeToProject = (item: Project) => {
    navigate(`/project/${item.localId}`);
  };

  const handleConfirmDelte = async () => {
    try {
      setLoading(true);
      setConfirmModalOpen(false);
      const response = await deleteSafe(`${projectAPI}/${deleteProject?._id}`);
      openSnackbar(`Successfully deleted ${response.name}`, 'success');
      fetchProjects();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setConfirmModalOpen(false);
      openSnackbar(`Something went wrong`, 'error');
      console.log(error);
    }
  };

  const handleDeleteProject = (item: Project) => {
    setConfirmModalOpen(true);
    setDeleteProject(item);
  };

  const handleEditProject = (item: Project) => {
    setEditProject(item);
  };

  const editSelectedProject = async (item: CreatePayload) => {
    try {
      setLoading(true);
      const payload = {
        id: editProject?._id,
        name: item.name,
        description: item.description,
        sections: editProject?.sections.map((section) => section._id),
      };
      setEditProject(null);
      await putSafe(projectAPI, payload);
      fetchProjects();
      setLoading(false);
    } catch (error) {
      setEditProject(null);
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <MainNavigation showProjects={false} />
      <MainContainer>
        <Header>
          <WelcomeUser>Wellcome, {user?.name || 'user'}</WelcomeUser>
          {user?.type !== 'VIEWER' ? (
            <Button
              variant="contained"
              startIcon={<Add />}
              size="small"
              onClick={() => {
                setIsCreateProject(true);
              }}
              sx={{ borderRadius: 20 }}
            >
              Create new design system
            </Button>
          ) : null}
        </Header>
        <TemplatesContainer>
          <SecondaryHeader>Create design system</SecondaryHeader>
          <SubText>
            Choose from our pre built templates or create your own design
            systems from the ground up
          </SubText>
          <TemplatesList>
            {templates.map((item) => (
              <Template key={`${item.id}-${item.title}`}>
                <TemplateImageWrapper>{item.image}</TemplateImageWrapper>
                <Title>{item.title}</Title>
              </Template>
            ))}
          </TemplatesList>
        </TemplatesContainer>
        <DesignsCOntainer>
          <SecondaryHeader>Your design systems</SecondaryHeader>
          <TemplatesList>
            {projects.map((item) => (
              <ProjectItem
                item={item}
                key={item._id}
                deleteProject={handleDeleteProject}
                editProject={handleEditProject}
                isViewer={user?.type === 'VIEWER'}
              />
            ))}
          </TemplatesList>
        </DesignsCOntainer>
      </MainContainer>
      {isCreateProject ? (
        <CreateEditProject
          open={isCreateProject}
          close={() => {
            setIsCreateProject(false);
          }}
          create={createProject}
          title={'Create Project'}
        />
      ) : null}

      {editProject ? (
        <CreateEditProject
          open={!!editProject}
          close={() => {
            setEditProject(null);
          }}
          create={editSelectedProject}
          title={'Edit Project'}
          isEdit={true}
          item={{
            name: editProject.name,
            description: editProject.description,
          }}
        />
      ) : null}
      {deleteProject && confirmModalOpen ? (
        <ConfirmModal
          open={confirmModalOpen}
          title="Are you sure?"
          message={`Are you sure you want to delete "${deleteProject?.name}" design system`}
          close={() => {
            setConfirmModalOpen(false);
            setDeleteProject(null);
          }}
          confirm={handleConfirmDelte}
        />
      ) : null}
    </Container>
  );
};

export default MyOverview;

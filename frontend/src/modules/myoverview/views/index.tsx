import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '@modules/common/components/mainnavigation';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import { Button, IconButton, Menu, MenuItem, css } from '@mui/material';
import { Add } from '@mui/icons-material';
import color from '@utils/styles/color';
import { templates } from '@utils/contants/designs';
import design1 from '@assets/images/design1.png';
import cursor from '@utils/styles/cursor';
import CreateProject from '../../common/components/createmodal';
import { Project, CreatePayload } from '@datatypes/project';
import { post } from '@api/safe';
import text from '@utils/styles/text';
import { AppContextType, useMainContext } from '@context/maincontext';
import { useSnackbar } from '@modules/common/components/snackbar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ConfirmModal from '@modules/common/components/confirmModal';

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

const Design = styled.div`
  ${CardTemplate}
  background-color: ${color.purple0};
`;

const Title = styled.div`
  padding: ${spacing.medium}px ${spacing.small}px;
`;

const CardActionButton = styled(IconButton)`
  position: absolute;
  top: -10px;
  right: -5px;
`;

const CustomMenuItem = styled(MenuItem)`
  min-width: 175px !important;
`;

const MyOverview = () => {
  const [isCreateProject, setIsCreateProject] = useState(false);
  const navigate = useNavigate();
  const { user, projects, fetchProjects }: AppContextType = useMainContext();
  const { openSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const handleProjectAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleEditProject = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('edit project from here');
  };

  const handleCopyProject = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('copy project from here');
  };

  const handleDeleteProject = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setConfirmModalOpen(true);
  };

  const createProject = async (project: CreatePayload) => {
    try {
      setIsCreateProject(false);
      const respose: Project = await post('/api/projects', project);
      openSnackbar('Successfully created new design system', 'success');
      fetchProjects();
      setTimeout(() => {
        routeToProject(respose);
      }, 200);
    } catch (e) {
      console.log(e);
    }
  };

  const routeToProject = (item: Project) => {
    navigate(`/project/${item.localId}`);
  };

  const handleConfirmDelte = () => {
    console.log('Delete the project from here');
  };

  return (
    <Container>
      <MainNavigation showProjects={false} />
      <MainContainer>
        <Header>
          <WelcomeUser>Wellcome, {user?.name || 'user'}</WelcomeUser>
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
              <Design
                key={`${item._id}`}
                onClick={() => {
                  routeToProject(item);
                }}
              >
                <TemplateImageWrapper>
                  <img src={design1} alt={item.name} />
                </TemplateImageWrapper>
                <Title>{item.name}</Title>
                <CardActionButton
                  aria-label="fingerprint"
                  color="primary"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(event) => handleProjectAction(event)}
                >
                  <MoreHorizIcon />
                </CardActionButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <CustomMenuItem onClick={handleEditProject}>
                    Edit
                  </CustomMenuItem>
                  <CustomMenuItem onClick={handleCopyProject}>
                    Duplicate
                  </CustomMenuItem>
                  <CustomMenuItem onClick={handleDeleteProject}>
                    Delete
                  </CustomMenuItem>
                </Menu>
                {/* TBD: Confirm box for delete is required */}
              </Design>
            ))}
          </TemplatesList>
        </DesignsCOntainer>
      </MainContainer>
      {isCreateProject ? (
        <CreateProject
          open={isCreateProject}
          close={() => {
            setIsCreateProject(false);
          }}
          create={createProject}
          title={'Create Project'}
        />
      ) : null}
      <ConfirmModal
        open={confirmModalOpen}
        title="Are you sure?"
        message="Dummy message"
        close={() => setConfirmModalOpen(false)}
        confirm={handleConfirmDelte}
      />
    </Container>
  );
};

export default MyOverview;

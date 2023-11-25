import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@context/authprovider';
import MainNavigation from '@modules/common/components/mainnavigation';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import color from '@utils/styles/color';
import { designs, templates } from '@utils/contants/designs';
import align from '@utils/styles/align';
import cursor from '@utils/styles/cursor';
import CreateProject from '../components/createproject';
import { Project } from '../../../types/project';
import { post } from '@api/safe';
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

const TemplatesContainer = styled.div`
  margin: ${spacing.small}px 0;
  background-color: ${color.purple0};
  padding: ${spacing.medium}px;
  background-color: ${color.purple0};
`;

const DesignsCOntainer = styled.div`
  margin: ${spacing.large}px 0;
  padding: ${spacing.medium}px;
`;

const TemplatesList = styled.div`
  display: flex;
  gap: ${spacing.medium}px;
`;

const Template = styled.div`
  width: 180px;
  height: 180px;
  background-color: ${color.gray0};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${cursor.pointer};
`;

const Design = styled.div`
  width: 180px;
  height: 180px;
  background-color: ${color.purple0};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${cursor.pointer};
`;

const Title = styled.div`
  ${align.centerH};
  padding: ${spacing.large}px;
`;

const MyOverview = () => {
  const [isCreateProject, setIsCreateProject] = useState(false);

  const { setAuth }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const createProject = async (project: Project) => {
    try {
      const data = await post('/project', project);
      console.log('createProject', data);
    } catch (e) {
      console.log(e);
    }
  };

  const routeToProject = () => {
    navigate('/project/1/2/3/4');
  };

  return (
    <Container>
      <MainNavigation />
      <MainContainer>
        <Header>
          <span>Wellcome Pushkar</span>
          <Button
            variant="contained"
            startIcon={<Add />}
            size="small"
            onClick={() => {
              setIsCreateProject(true);
            }}
          >
            Create new design system
          </Button>
        </Header>
        <TemplatesContainer>
          <b>Create design system</b>
          <p>
            Choose from our pre built templates or create your own design
            systems from the ground up
          </p>
          <TemplatesList>
            {templates.map((item) => (
              <Template
                key={`${item.id}-${item.title}`}
                onClick={routeToProject}
              >
                {item.image}
                <Title>{item.title}</Title>
              </Template>
            ))}
          </TemplatesList>
        </TemplatesContainer>
        <DesignsCOntainer>
          <p>Your design systems</p>
          <TemplatesList>
            {designs.map((item) => (
              <Design key={`${item.id}-${item.title}`} onClick={routeToProject}>
                {item.image}
                <Title>{item.title}</Title>
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
        />
      ) : null}
    </Container>
  );
};

export default MyOverview;

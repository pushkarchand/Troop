import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@context/authprovider';
import MainNavigation from '@modules/common/components/mainnavigation';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import { Button, css } from '@mui/material';
import { Add } from '@mui/icons-material';
import color from '@utils/styles/color';
import { designs, templates } from '@utils/contants/designs';
import cursor from '@utils/styles/cursor';
import CreateProject from '../components/createproject';
import { Project } from '../../../types/project';
import { post } from '@api/safe';
import text from '@utils/styles/text';

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
          <WelcomeUser>Wellcome, Pushkar</WelcomeUser>
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
          <SecondaryHeader>Create design system</SecondaryHeader>
          <SubText>
            Choose from our pre built templates or create your own design
            systems from the ground up
          </SubText>
          <TemplatesList>
            {templates.map((item) => (
              <Template
                key={`${item.id}-${item.title}`}
                onClick={routeToProject}
              >
                <TemplateImageWrapper>{item.image}</TemplateImageWrapper>
                <Title>{item.title}</Title>
              </Template>
            ))}
          </TemplatesList>
        </TemplatesContainer>
        <DesignsCOntainer>
          <SecondaryHeader>Your design systems</SecondaryHeader>
          <TemplatesList>
            {designs.map((item) => (
              <Design key={`${item.id}-${item.title}`} onClick={routeToProject}>
                <TemplateImageWrapper>{item.image}</TemplateImageWrapper>
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

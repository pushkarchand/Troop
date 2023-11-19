import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@context/authprovider';
import ReichTextEditor from '@modules/common/components/richtexteditor';
import MainNavigation from '@modules/common/components/mainnavigation';
import SideBar from '@modules/common/components/sidebar';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  box-sizing: borde-box;
  height: 100%;
`;

const RightSection = styled.div`
  display: flex;
  width: 150px;
`;

const CenterSection = styled.div`
  display: flex;
  flex: 1;
  padding: ${spacing.small}px;
  box-sizing: border-box;
  padding: ${spacing.large}px;
  overflow-y: auto;
`;

const Project = () => {
  const { projectId, section, page, subpage } = useParams();

  const { setAuth }: any = useContext(AuthContext);
  const navigate = useNavigate();
  console.log('Project', { projectId, section, page, subpage });
  const logout = async () => {
    setAuth({});
    navigate('/');
  };

  return (
    <Container>
      <MainNavigation />
      <MainContainer>
        <SideBar />
        <CenterSection>
          <ReichTextEditor />
        </CenterSection>
        <RightSection></RightSection>
      </MainContainer>
    </Container>
  );
};

export default Project;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@context/authprovider';

import MainNavigation from '@modules/common/components/mainnavigation';
import SideBar from '@modules/common/components/sidebar';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import BasicTabs from '../components/tabs';

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
  padding:  ${spacing.small}px ${spacing.large}px;
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

const Project = () => {
  // const { projectId, section, page, subpage } = useParams();
  const [name, setName] = useState('Button');
  const [description, setDescription] = useState('');
  const { setAuth }: any = useContext(AuthContext);
  const navigate = useNavigate();

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

export default Project;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@context/authprovider';
import ReichTextEditor from '@modules/common/components/richtexteditor';
import MainNavigation from '@modules/common/components/mainnavigation';
import SideBar from '@modules/common/components/sidebar';
import styled from '@emotion/styled';
import spacing from '@utils/styles/spacing';
import { Button } from '@mui/material';

const MainContainer = styled.div`
  display: flex;
  box-sizing: borde-box;
  flex-direction: column;
`;

const RightSection = styled.div`
  display: flex;
  width: 150px;
`;

const CenterSection = styled.div`
  display: flex;
  flex-grow: 1;
  padding: ${spacing.small}px;
  box-sizing: borde-box;
  padding: ${spacing.large}px;
`;

const MyOverview = () => {
  const { setAuth }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    navigate('/');
  };

  return (
    <section>
      <MainNavigation />
      <MainContainer>
        <div>MyOverview</div>
        <Button
          variant="outlined"
          onClick={() => {
            navigate('/project/1/2/3/4');
          }}
        >
          Project Details
        </Button>
      </MainContainer>
    </section>
  );
};

export default MyOverview;

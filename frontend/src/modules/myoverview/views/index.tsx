import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@context/authprovider';
import MainNavigation from '@modules/common/components/mainnavigation';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
const MainContainer = styled.div`
  display: flex;
  box-sizing: borde-box;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyOverview = () => {
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
    </Container>
  );
};

export default MyOverview;

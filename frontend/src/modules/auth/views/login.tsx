import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAuth from '@modules/common/hooks/useauth';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Logo from '@assets/images/logo.svg';
import MainCover from '@assets/images/maincover.png';
const LOGIN_URL = '/auth';

const MainSection = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const Login = () => {
  const { setAuth }: any = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || '/';

  return (
    <MainSection>
      <img src={Logo} alt="logo" />
      Lets get started ! Step into the action! Your adventure begins here! 😄 🚀
      <Button
        component="label"
        variant="contained"
        onClick={() => {
          setAuth({
            user: { name: 'Pushkar' },
            pwd: '2962',
            roles: [2001, 5150],
            accessToken: '',
          });
          navigate('/', { replace: true });
        }}
        startIcon={<GoogleIcon />}
      >
        Sign in with Google
      </Button>
      <img src={MainCover} alt="main cover" />
    </MainSection>
  );
};

export default Login;

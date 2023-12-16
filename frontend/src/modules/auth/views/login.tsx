import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Logo from '@assets/images/logo.svg';
import MainCover from '@assets/images/maincover.png';
import spacing from '@utils/styles/spacing';
import align from '@utils/styles/align';
import { useMainContext } from '@context/maincontext';
import { loginUser } from '@api/safe';
import { decodeToken } from '@context/useauth';
import { useSnackbar } from '@modules/common/components/snackbar';
const emailValidationMsg = 'Please enter a valid email address';
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

interface ILoginValidation {
  email: string | null;
  password: string | null;
}

const MainSection = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const WelcomeText = styled.div`
  font-size: 20px;
  line-height: 24px;
`;

const MainBodyContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`;

const StyledImage = styled.img`
  width: calc(100% - 300px);
  height: calc(100vh - 225px);
`;

const LoginSection = styled.div`
  ${align.centerV};
  padding: ${spacing.large}px;
  gap: ${spacing.large}px;
  width: 100%;
  flex-direction: column;
  position: absolute;
  right: 0;
  width: 300px;
  top: 100px;
`;

const Login = () => {
  const { setUser, setLoading }: any = useMainContext();
  const { openSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState<ILoginValidation>({
    email: null,
    password: null,
  });
  const navigate = useNavigate();

  const handleLoginUser = async () => {
    try {
      setLoading(true);
      const response = await loginUser({ email, password });
      if (response.token) {
        localStorage.setItem('alluvium_auth_token', response.token);
        const token = decodeToken(response.token);
        setTimeout(() => {
          setUser({ name: token.name, type: token.type, id: token._id });
          openSnackbar('Successfully logedin', 'success');
          navigate('/');
          setLoading(false);
        }, 1000);
      } else if (response.message) {
        setLoading(false);
        openSnackbar(response.message, 'error');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      openSnackbar('Invalid credentials', 'error');
    }
  };
  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value);
    if (emailPattern.test(event.target.value)) {
      setValidation({
        ...validation,
        email: null,
      });
    } else {
      setValidation({
        ...validation,
        email: emailValidationMsg,
      });
    }
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  return (
    <MainSection>
      <img src={Logo} alt="logo" />
      <WelcomeText>
        Lets get started ! Step into the action! Your adventure begins here! 😄
        🚀
      </WelcomeText>
      <MainBodyContainer>
        <StyledImage src={MainCover} alt="main cover" />
        <LoginSection>
          <TextField
            error={!!validation.email}
            label="Email"
            variant="outlined"
            focused
            required
            fullWidth
            value={email}
            onChange={handleEmailChange}
            helperText={validation.email}
          />
          <TextField
            id="Password"
            required
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            onChange={handlePasswordChange}
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<LoginIcon />}
            fullWidth
            size="large"
            onClick={handleLoginUser}
            disabled={
              !!validation.email ||
              !email.trim() ||
              !!validation.password ||
              !password.trim()
            }
          >
            Login
          </Button>
        </LoginSection>
      </MainBodyContainer>
    </MainSection>
  );
};

export default Login;

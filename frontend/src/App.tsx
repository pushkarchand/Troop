import React from 'react';
import RequireAuth from './modules/common/requireauth';
import CircularProgress from '@mui/material/CircularProgress';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './modules/common/views/pagenotfound';
import Login from './modules/auth/views/login';
import MyOverview from './modules/myoverview/views';
import Project from '@modules/project/views';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from '@modules/common/components/snackbar';
import styled from '@emotion/styled';
import { useMainContext } from '@context/maincontext';
import Memebers from '@modules/members';

const Loader = styled.div`
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

function App() {
  // Override Mui theme from the root here
  const { loading }: any = useMainContext();
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: '5px 20px',
            fontSize: '14px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : null}

      <SnackbarProvider>
        <Routes>
          <Route element={<RequireAuth auth={false} />}>
            {/* public routes */}
            <Route path="login" element={<Login />} />
          </Route>
          {/* we want to protect these routes */}
          <Route element={<RequireAuth auth={true} />}>
            <Route path="/" element={<MyOverview />} />
            <Route path="/project" element={<Project />} />
            <Route path="/members" element={<Memebers />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/project/:projectId/:pageId" element={<Project />} />
            <Route
              path="/project/:projectId/:pageId/:subPageId"
              element={<Project />}
            />
          </Route>

          {/* catch all */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import RequireAuth from './modules/common/requireauth';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './modules/common/views/pagenotfound';
import Login from './modules/auth/views/login';
import MyOverview from './modules/myoverview/views';
import Project from '@modules/project/views';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from '@modules/common/components/snackbar';

function App() {
  // Override Mui theme from the root here
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
      <SnackbarProvider>
        <Routes>
          <Route path="/">
            {/* public routes */}
            <Route path="login" element={<Login />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth />}>
              <Route path="/" element={<MyOverview />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/project" element={<Project />} />
              <Route path="/project/:projectId" element={<Project />} />
              <Route
                path="/project/:projectId/:section"
                element={<Project />}
              />
              <Route
                path="/project/:projectId/:section/:page"
                element={<Project />}
              />
              <Route
                path="/project/:projectId/:section/:page/:subpage"
                element={<Project />}
              />
            </Route>

            {/* catch all */}
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;

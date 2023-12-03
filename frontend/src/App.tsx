import React from 'react';
import RequireAuth from './modules/common/requireauth';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './modules/common/views/pagenotfound';
import Login from './modules/auth/views/login';
import MyOverview from './modules/myoverview/views';
import Project from '@modules/project/views';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from '@modules/common/components/snackbar';
import { useAuth } from '@context/useauth';

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
          <Route element={<RequireAuth auth={false}/>}>
            {/* public routes */}
            <Route path="login" element={<Login />} />
          </Route>
          {/* we want to protect these routes */}
          <Route element={<RequireAuth auth={true}/>}>
            <Route path="/" element={<MyOverview />} />
            <Route path="/project" element={<Project />} />
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

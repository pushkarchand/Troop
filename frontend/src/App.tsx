import React from 'react';
import RequireAuth from './modules/common/requireauth';
import { Routes, Route } from 'react-router-dom';
import PageNotFound from './modules/common/views/pagenotfound';
import Login from './modules/auth/views/login';
import MyOverview from './modules/myoverview/views';
import Project from '@modules/project/views';

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/">
        {/* public routes */}
        <Route path="login" element={<Login />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<MyOverview />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/project" element={<Project />} />
          <Route
            path="/project/:projectId/:section/:page/:subpage"
            element={<Project />}
          />
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route> */}

        {/* catch all */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

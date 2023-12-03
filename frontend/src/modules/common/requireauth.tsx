import { useMainContext } from '@context/maincontext';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ auth }: { auth: boolean }) => {
  const { user }: any = useMainContext();

  return auth ? (
    user ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    )
  ) : user ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default RequireAuth;

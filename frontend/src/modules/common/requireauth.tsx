import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from './hooks/useauth';

const RequireAuth = ({ allowedRoles }: any) => {
  const { auth }: any = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role: string) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

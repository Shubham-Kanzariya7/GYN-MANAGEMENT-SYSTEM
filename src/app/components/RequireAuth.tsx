import { Navigate, Outlet } from 'react-router';
import { isAuthenticated } from '../../api/authService';

export function RequireAuth() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

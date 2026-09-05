import { Navigate, useLocation } from 'react-router-dom';
import { useTeacherAuth } from '../../context/TeacherAuthContext';

const TeacherGuard = ({ children }) => {
  const { user, initializing, profile, profileLoading } = useTeacherAuth();
  const location = useLocation();

  if (initializing || (user && profileLoading)) return null;
  if (!user) return <Navigate to="/teacher/login" replace />;

  const registrationDone = Boolean(profile?.registrationCompleted);
  if (!registrationDone && location.pathname !== '/teacher/register') {
    return <Navigate to="/teacher/register" replace />;
  }

  return children;
};

export default TeacherGuard;

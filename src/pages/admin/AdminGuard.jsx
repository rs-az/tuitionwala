import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLogin from './AdminLogin';

const AdminGuard = ({ children }) => {
    const { isAuthenticated } = useAdminAuth();

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return children;
};

export default AdminGuard;

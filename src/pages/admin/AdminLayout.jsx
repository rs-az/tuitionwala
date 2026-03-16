import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    const { logout } = useAdminAuth();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: 'fa-chart-pie' },
        { path: '/admin/jobs', label: 'Manage Jobs', icon: 'fa-briefcase' },
        { path: '/admin/demos', label: 'Demo Requests', icon: 'fa-calendar-check' },
        { path: '/admin/subjects', label: 'Manage Subjects', icon: 'fa-book' },
    ];

    return (
        <div className={`admin-layout ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <Link to="/" className="logo sidebar-logo">
                        <span className="text-gradient">Admin</span>Panel
                    </Link>
                    <button className="btn-close-sidebar" onClick={toggleSidebar}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                                >
                                    <i className={`fas ${item.icon}`}></i>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <Link to="/" className="sidebar-link return-home">
                        <i className="fas fa-home"></i>
                        <span>Return to Website</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <button className="btn-toggle-sidebar" onClick={toggleSidebar}>
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="topbar-right">
                        <div className="admin-profile">
                            <div className="avatar">A</div>
                            <span>Admin</span>
                        </div>
                        <button className="btn-logout" onClick={logout} title="Logout">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                </header>

                <main className="admin-content-area">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

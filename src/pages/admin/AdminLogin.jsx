import { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import './AdminLogin.css';

const AdminLogin = ({ onSuccess }) => {
    const { login, error } = useAdminAuth();
    const [form, setForm] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Small delay for UX feedback
        await new Promise((r) => setTimeout(r, 600));
        const success = login(form.username, form.password);
        setIsLoading(false);
        if (success && onSuccess) onSuccess();
    };

    return (
        <div className="admin-login-page">
            <div className="login-background">
                <div className="login-bg-shape shape-1"></div>
                <div className="login-bg-shape shape-2"></div>
            </div>

            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <span className="text-gradient">Tuition</span>wala
                    </div>
                    <h1>Admin Panel</h1>
                    <p>Sign in to manage your platform</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-form-group">
                        <label htmlFor="username">
                            <i className="fas fa-user"></i> Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            placeholder="Enter admin username"
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password">
                            <i className="fas fa-lock"></i> Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter admin password"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="login-error">
                            <i className="fas fa-exclamation-circle"></i> {error}
                        </div>
                    )}

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i> Signing In...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt"></i> Sign In
                            </>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <a href="/" className="back-link">
                        <i className="fas fa-arrow-left"></i> Back to Website
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

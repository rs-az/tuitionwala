import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTeacherAuth } from '../../context/TeacherAuthContext';
import PasswordInput from '../../components/PasswordInput';
import './TeacherAuth.css';

const TeacherLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setError, error, firebaseReady } = useTeacherAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(form);
      const params = new URLSearchParams(location.search);
      const next = params.get('next');
      navigate(next || '/teacher');
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Failed to sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container teacher-auth-page">
      <div className="teacher-auth-card">
        <h1>
          Teacher <span className="text-gradient">Sign in</span>
        </h1>
        <p className="teacher-auth-subtitle">Welcome back. Continue where you left off.</p>

        {!firebaseReady && (
          <div className="teacher-auth-error">
            Firebase is not configured. Add your keys to <code>.env.local</code> and restart the dev server.
          </div>
        )}

        {error && <div className="teacher-auth-error">{error}</div>}

        <form className="teacher-auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <PasswordInput
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-primary btn-full" type="submit" disabled={isLoading || !firebaseReady}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="teacher-auth-footer">
            <span>
              New teacher? <Link to="/teacher/register">Create account</Link>
            </span>
            <Link to="/" className="text-muted">
              Back to home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherLogin;


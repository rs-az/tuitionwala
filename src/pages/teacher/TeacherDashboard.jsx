import { Link, useNavigate } from 'react-router-dom';
import { useTeacherAuth } from '../../context/TeacherAuthContext';
import { useEffect, useMemo, useState } from 'react';
import { getFirebaseDatabase, isFirebaseConfigured } from '../../lib/firebase';
import { subscribeList } from '../../services/rtdb';

const TeacherDashboard = () => {
  const { user, logout, profile } = useTeacherAuth();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loadError, setLoadError] = useState('');

  const db = useMemo(() => getFirebaseDatabase(), []);
  const firebaseReady = isFirebaseConfigured() && Boolean(db);

  useEffect(() => {
    if (!firebaseReady || !user?.uid) return;

    const unsubApps = subscribeList(
      db,
      `teacherApplications/${user.uid}`,
      (list) => {
        const sorted = [...list].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setApplications(sorted);
      },
      (err) => {
        console.error(err);
        setLoadError('Failed to load applications.');
      },
    );

    const unsubJobs = subscribeList(
      db,
      'jobPosts',
      (list) => {
        setJobs(list);
      },
      (err) => {
        console.error(err);
        setLoadError('Failed to load jobs.');
      },
    );

    return () => {
      unsubApps();
      unsubJobs();
    };
  }, [db, firebaseReady, user?.uid]);

  const jobById = useMemo(() => {
    const map = new Map();
    jobs.forEach((j) => map.set(j.id, j));
    return map;
  }, [jobs]);

  const verified = Boolean(profile?.verified);

  return (
    <div className="page-container">
      <div className="container" style={{ padding: '28px 0' }}>
        <div className="admin-card" style={{ padding: 18 }}>
          <h1 style={{ margin: 0 }}>
            Teacher <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-muted" style={{ marginTop: 8 }}>
            Signed in as <strong>{user?.displayName || 'Teacher'}</strong> ({user?.email})
          </p>
          <div className="text-muted" style={{ marginTop: 6 }}>
            {verified ? (
              <span style={{ color: '#10b981', fontWeight: 700 }}>
                <i className="fas fa-check-circle"></i> Verified
              </span>
            ) : (
              <span style={{ color: '#f59e0b', fontWeight: 700 }}>
                <i className="fas fa-clock"></i> Not verified yet (you can browse jobs, but can’t apply until verified)
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
            <Link to="/" className="btn btn-outline-primary">
              Go to Home
            </Link>
            <Link to="/jobs" className="btn btn-secondary">
              Browse Jobs
            </Link>
            <button className="btn btn-outline-primary" onClick={() => navigate('/teacher/profile')}>
              View / Edit Profile
            </button>
            <button className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="admin-card" style={{ padding: 18, marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0 }}>My Applications</h2>
            <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/jobs')}>
              Apply to more jobs
            </button>
          </div>

          {loadError && (
            <div className="text-danger" style={{ marginTop: 10 }}>
              {loadError}
            </div>
          )}

          {applications.length === 0 ? (
            <div className="text-muted" style={{ marginTop: 10 }}>
              You haven’t applied to any jobs yet.
            </div>
          ) : (
            <div className="table-responsive" style={{ marginTop: 10 }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Job</th>
                    <th>Area</th>
                    <th>For</th>
                    <th>Status</th>
                    <th>Applied</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => {
                    const job = jobById.get(app.jobId);
                    return (
                      <tr key={app.id}>
                        <td>
                          <strong>#{app.jobId}</strong>
                        </td>
                        <td>{job?.area || '—'}</td>
                        <td>{job?.classAndSubject || '—'}</td>
                        <td>
                          <span className={`status-badge ${(app.status || 'applied').toLowerCase()}`}>{app.status || 'applied'}</span>
                        </td>
                        <td>{(app.createdAt || '').slice(0, 10)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;


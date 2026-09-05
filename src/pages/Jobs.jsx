import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Jobs.css';
import { getFirebaseDatabase, isFirebaseConfigured } from '../lib/firebase';
import { setItem, subscribeList } from '../services/rtdb';
import { useTeacherAuth } from '../context/TeacherAuthContext';

const Jobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useTeacherAuth();

  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState('');
  const [loadError, setLoadError] = useState('');

  const db = useMemo(() => getFirebaseDatabase(), []);
  const firebaseReady = isFirebaseConfigured() && Boolean(db);

  useEffect(() => {
    if (!firebaseReady) return;
    const unsub = subscribeList(
      db,
      'jobPosts',
      (list) => {
        const active = list
          .filter((j) => (j.status || 'active') === 'active')
          .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setJobs(active);
      },
      (err) => {
        console.error(err);
        setLoadError('Failed to load jobs.');
      },
    );
    return () => unsub();
  }, [db, firebaseReady]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jobId = params.get('job');
    if (!jobId) return;
    if (jobs.length === 0) return;

    const el = document.getElementById(`job-${jobId}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [jobs, location.search]);

  const filtered = jobs.filter((j) => {
    if (!q.trim()) return true;
    const hay = `${j.area || ''} ${j.classAndSubject || ''} ${j.preference || ''} ${j.requirement || ''}`.toLowerCase();
    return hay.includes(q.trim().toLowerCase());
  });

  const applyToJob = async (job) => {
    if (!user) {
      navigate('/teacher/login?next=/jobs');
      return;
    }
    if (!profile?.registrationCompleted) {
      alert('Please complete your tutor registration before applying.');
      navigate('/teacher/register');
      return;
    }
    if (!profile?.verified) {
      alert('Your profile is not verified yet. Please wait for admin verification before applying.');
      navigate('/teacher');
      return;
    }
    if (!firebaseReady) {
      alert('Firebase is not configured.');
      return;
    }
    try {
      const payload = {
        jobId: job.id,
        teacherUid: user.uid,
        teacherEmail: user.email || '',
        teacherName: user.displayName || '',
        status: 'applied',
        createdAt: new Date().toISOString(),
      };

      // Store under the job (admin-friendly) and under the teacher (teacher-friendly).
      await setItem(db, `jobApplications/${job.id}/${user.uid}`, payload);
      await setItem(db, `teacherApplications/${user.uid}/${job.id}`, payload);
      alert('Applied successfully. We will contact you if shortlisted.');
    } catch (err) {
      console.error(err);
      alert('Failed to apply. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <div className="container" style={{ paddingTop: 18, paddingBottom: 26 }}>
        <div className="jobs-page-header">
          <div>
            <h1>
              All <span className="text-gradient">Jobs</span>
            </h1>
            <div className="text-muted">Browse available tuition jobs. Apply as a teacher when you’re ready.</div>
          </div>
          <div className="jobs-filters">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by area, class, subject..." />
          </div>
        </div>

        {!firebaseReady && (
          <div className="text-muted" style={{ marginBottom: 12 }}>
            Firebase is not configured. Add your keys to `.env.local` (see `.env.example`) and restart the dev server.
          </div>
        )}
        {loadError && (
          <div className="text-danger" style={{ marginBottom: 12 }}>
            {loadError}
          </div>
        )}

        <div className="jobs-grid">
          {filtered.map((job) => (
            <div className="job-list-card" key={job.id} id={`job-${job.id}`}>
              <div className="job-list-top">
                <div className="job-list-id">Job #{job.id}</div>
                <span className="status-badge active">Active</span>
              </div>

              <div className="job-list-meta">
                <div>
                  <strong>Area:</strong> {job.area}
                </div>
                <div>
                  <strong>For:</strong> {job.classAndSubject}
                </div>
                <div>
                  <strong>Preference:</strong> {job.preference || 'Any'}
                </div>
              </div>

              <div className="text-muted" style={{ marginBottom: 12 }}>
                {job.requirement}
              </div>

              <div className="job-list-actions">
                <button className="btn btn-primary btn-sm" onClick={() => applyToJob(job)} disabled={Boolean(user) && !profile?.verified}>
                  Apply
                </button>
                {!user && (
                  <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/teacher/login?next=/jobs')}>
                    Login to apply
                  </button>
                )}
                {user && !profile?.verified && (
                  <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/teacher')}>
                    Get verified
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {firebaseReady && filtered.length === 0 && (
          <div className="text-muted" style={{ marginTop: 16 }}>
            No jobs found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;


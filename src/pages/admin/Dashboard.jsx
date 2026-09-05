import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { getFirebaseDatabase, isFirebaseConfigured } from '../../lib/firebase';
import { subscribeList } from '../../services/rtdb';

const Dashboard = () => {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [demos, setDemos] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loadError, setLoadError] = useState('');

    const db = useMemo(() => getFirebaseDatabase(), []);
    const firebaseReady = isFirebaseConfigured() && Boolean(db);

    useEffect(() => {
        if (!firebaseReady) return;

        const cleanups = [];

        cleanups.push(
            subscribeList(
                db,
                'jobPosts',
                (list) => {
                    setJobs(list);
                },
                (err) => {
                    console.error(err);
                    setLoadError('Failed to load dashboard data.');
                },
            ),
        );

        cleanups.push(
            subscribeList(
                db,
                'demoRequests',
                (list) => {
                    setDemos(list);
                },
                (err) => {
                    console.error(err);
                    setLoadError('Failed to load dashboard data.');
                },
            ),
        );

        cleanups.push(
            subscribeList(
                db,
                'subjects/categories',
                (list) => {
                    setSubjects(list);
                },
                (err) => {
                    console.error(err);
                    setLoadError('Failed to load dashboard data.');
                },
            ),
        );

        cleanups.push(
            subscribeList(
                db,
                'teachers',
                (list) => {
                    setTeachers(list);
                },
                (err) => {
                    console.error(err);
                    setLoadError('Failed to load dashboard data.');
                },
            ),
        );

        return () => {
            cleanups.forEach((unsub) => {
                try {
                    unsub();
                } catch {
                    // ignore
                }
            });
        };
    }, [db, firebaseReady]);

    const activeJobsCount = jobs.filter((j) => (j.status || 'active') === 'active').length;
    const pendingDemosCount = demos.filter((d) => (d.status || 'Pending') === 'Pending').length;
    const totalSubjectsCount = subjects.reduce((total, s) => {
        if (Array.isArray(s.subjects)) return total + s.subjects.length;
        return total;
    }, 0);
    const registeredTutorsCount = teachers.length;
    const unverifiedTutorsCount = teachers.filter((t) => !t.verified).length;

    const stats = [
        { label: 'Active Jobs', value: String(activeJobsCount), icon: 'fa-briefcase', color: 'var(--primary)', trend: '' },
        { label: 'Pending Demos', value: String(pendingDemosCount), icon: 'fa-calendar-alt', color: '#f59e0b', trend: '' },
        { label: 'Registered Tutors', value: String(registeredTutorsCount), icon: 'fa-chalkboard-teacher', color: '#10b981', trend: `${unverifiedTutorsCount} pending verification` },
        { label: 'Total Subjects', value: String(totalSubjectsCount), icon: 'fa-book', color: '#8b5cf6', trend: `${subjects.length} categories` },
    ];

    const sortedRecentDemos = [...demos]
        .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
        .slice(0, 5);

    const formatDate = (iso) => {
        if (!iso) return '';
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return iso;
        return d.toISOString().slice(0, 10);
    };

    const goToJobs = () => navigate('/admin/jobs');
    const goToDemos = () => navigate('/admin/demos');
    const goToSubjects = () => navigate('/admin/subjects');
    const goToTeachers = () => navigate('/admin/teachers');

    return (
        <div className="admin-dashboard">
            <div className="admin-page-header">
                <h1 className="admin-page-title">Dashboard Overview</h1>
                <button className="btn btn-primary" onClick={goToJobs}>
                    <i className="fas fa-plus"></i> Post New Job
                </button>
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

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div className="admin-card stat-card" key={index}>
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            <i className={`fas ${stat.icon}`}></i>
                        </div>
                        <div className="stat-details">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                        <div className="stat-trend">{stat.trend}</div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="admin-card recent-demos-card">
                    <div className="card-header">
                        <h2>Recent Demo Requests</h2>
                        <a href="/admin/demos" className="view-all">View All</a>
                    </div>
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Parent Name</th>
                                    <th>Subject (Grade)</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedRecentDemos.map(demo => (
                                    <tr key={demo.id}>
                                        <td>
                                            <strong>{demo.parentName}</strong>
                                        </td>
                                        <td>{demo.subject} ({demo.grade})</td>
                                        <td>{formatDate(demo.createdAt)}</td>
                                        <td>
                                            <span className={`status-badge ${(demo.status || '').toLowerCase()}`}>
                                                {demo.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-icon" aria-label="View Details" onClick={() => navigate('/admin/demos')}>
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="admin-card quick-actions-card">
                    <div className="card-header">
                        <h2>Quick Actions</h2>
                    </div>
                    <div className="actions-list">
                        <button className="action-btn" onClick={goToJobs}>
                            <i className="fas fa-briefcase text-primary"></i>
                            <span>Post New Job</span>
                        </button>
                        <button className="action-btn" onClick={goToDemos}>
                            <i className="fas fa-envelope-open-text" style={{ color: '#f59e0b' }}></i>
                            <span>Review Demos</span>
                        </button>
                        <button className="action-btn" onClick={goToSubjects}>
                            <i className="fas fa-book-medical" style={{ color: '#10b981' }}></i>
                            <span>Add Subject</span>
                        </button>
                        <button className="action-btn" onClick={goToTeachers}>
                            <i className="fas fa-user-check" style={{ color: '#6b7280' }}></i>
                            <span>Verify Teachers</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

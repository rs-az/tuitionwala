import { useEffect, useMemo, useState } from 'react';
import './AdminForms.css';
import { getFirebaseDatabase, isFirebaseConfigured } from '../../lib/firebase';
import { subscribeList, updateItem, createItem, deleteItem } from '../../services/rtdb';

const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loadError, setLoadError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApplicantsOpen, setIsApplicantsOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [applications, setApplications] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [form, setForm] = useState({
        area: '',
        parentName: '',
        classAndSubject: '',
        preference: 'Any',
        requirement: '',
    });

    const db = useMemo(() => getFirebaseDatabase(), []);
    const firebaseReady = isFirebaseConfigured() && Boolean(db);

    useEffect(() => {
        if (!firebaseReady) return;
        const unsubJobs = subscribeList(
            db,
            'jobPosts',
            (list) => {
                const sorted = [...list].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
                setJobs(sorted);
            },
            (err) => {
                console.error(err);
                setLoadError('Failed to load jobs from database.');
            },
        );
        const unsubTeachers = subscribeList(
            db,
            'teachers',
            (list) => setTeachers(list),
            (err) => {
                console.error(err);
            },
        );
        return () => {
            unsubJobs();
            unsubTeachers();
        };
    }, [db, firebaseReady]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const resetForm = () => {
        setForm({
            area: '',
            parentName: '',
            classAndSubject: '',
            preference: 'Any',
            requirement: '',
        });
    };

    const handleCreate = async () => {
        if (!firebaseReady) return;
        setLoadError('');
        try {
            await createItem(db, 'jobPosts', {
                ...form,
                status: 'active',
                createdAt: new Date().toISOString(),
            });
            setIsModalOpen(false);
            resetForm();
        } catch (e) {
            console.error(e);
            setLoadError('Failed to create job.');
        }
    };

    const handleDelete = async (id) => {
        if (!firebaseReady) return;
        if (!confirm('Delete this job?')) return;
        setLoadError('');
        try {
            await deleteItem(db, `jobPosts/${id}`);
        } catch (e) {
            console.error(e);
            setLoadError('Failed to delete job.');
        }
    };

    const handleStatusChange = async (id, nextStatus) => {
        if (!firebaseReady) return;
        setLoadError('');
        try {
            await updateItem(db, `jobPosts/${id}`, { status: nextStatus });
        } catch (e) {
            console.error(e);
            setLoadError('Failed to update status.');
        }
    };

    const statusLabel = (status) => {
        if (!status) return 'Active';
        return status === 'closed' ? 'Closed' : 'Active';
    };

    const openApplicants = (job) => {
        if (!firebaseReady) return;
        setSelectedJob(job);
        setIsApplicantsOpen(true);
        setApplications([]);
    };

    useEffect(() => {
        if (!firebaseReady || !isApplicantsOpen || !selectedJob?.id) return;
        const unsub = subscribeList(
            db,
            `jobApplications/${selectedJob.id}`,
            (list) => {
                const sorted = [...list].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
                setApplications(sorted);
            },
            (err) => {
                console.error(err);
                setLoadError('Failed to load applicants.');
            },
        );
        return () => unsub();
    }, [db, firebaseReady, isApplicantsOpen, selectedJob?.id]);

    const teacherByUid = useMemo(() => {
        const map = new Map();
        teachers.forEach((t) => {
            if (t.uid) map.set(t.uid, t);
        });
        return map;
    }, [teachers]);

    return (
        <div className="manage-page">
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Manage Jobs</h1>
                    <p className="admin-page-subtitle">Post and manage home tuition teaching requirements.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} disabled={!firebaseReady}>
                    <i className="fas fa-plus"></i> Add New Job
                </button>
            </div>

            <div className="admin-card">
                {!firebaseReady && (
                    <div className="text-muted" style={{ padding: 12 }}>
                        Firebase is not configured. Add your keys to `.env.local` (see `.env.example`) and restart the dev server.
                    </div>
                )}
                {loadError && (
                    <div className="text-danger" style={{ padding: 12 }}>
                        {loadError}
                    </div>
                )}
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Area / Location</th>
                                <th>Grade / Subject</th>
                                <th>Preference</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job.id}>
                                    <td><strong>#{job.id}</strong></td>
                                    <td>{job.area}</td>
                                    <td>{job.classAndSubject}</td>
                                    <td>{job.preference || 'Any'}</td>
                                    <td>
                                        <select
                                            className="status-dropdown"
                                            value={job.status || 'active'}
                                            onChange={(e) => handleStatusChange(job.id, e.target.value)}
                                            disabled={!firebaseReady}
                                        >
                                            <option value="active">Active</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <span className={`status-badge ${(job.status || 'active')}`}>{statusLabel(job.status)}</span>
                                            <button
                                                className="btn-icon text-primary"
                                                aria-label="Applicants"
                                                title="Applicants"
                                                onClick={() => openApplicants(job)}
                                                disabled={!firebaseReady}
                                            >
                                                <i className="fas fa-users"></i>
                                            </button>
                                            <button
                                                className="btn-icon text-danger"
                                                aria-label="Delete"
                                                title="Delete"
                                                onClick={() => handleDelete(job.id)}
                                                disabled={!firebaseReady}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mock Modal for adding a job */}
            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h2>Post New Home Tuition Job</h2>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="admin-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Area / Location</label>
                                        <input name="area" type="text" placeholder="e.g. Gomti Nagar" value={form.area} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Parent Name</label>
                                        <input name="parentName" type="text" placeholder="Parent's Name" value={form.parentName} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Grade & Subject</label>
                                        <input
                                            name="classAndSubject"
                                            type="text"
                                            placeholder="e.g. 10th - Science, Maths"
                                            value={form.classAndSubject}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Tutor Preference</label>
                                        <select name="preference" value={form.preference} onChange={handleChange}>
                                            <option value="Any">Any</option>
                                            <option value="Female Tutor">Female Tutor</option>
                                            <option value="Male Tutor">Male Tutor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Specific Requirements</label>
                                    <textarea
                                        name="requirement"
                                        rows="3"
                                        placeholder="Describe any specific needs..."
                                        value={form.requirement}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={handleCreate} disabled={!firebaseReady}>Post Job</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isApplicantsOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h2>Applicants — Job #{selectedJob?.id}</h2>
                            <button
                                className="btn-close"
                                onClick={() => {
                                    setIsApplicantsOpen(false);
                                    setSelectedJob(null);
                                    setApplications([]);
                                }}
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            {applications.length === 0 ? (
                                <div className="text-muted">No applications yet.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Teacher</th>
                                                <th>Contact</th>
                                                <th>Verified</th>
                                                <th>Applied</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {applications.map((a) => {
                                                const t = teacherByUid.get(a.teacherUid);
                                                return (
                                                    <tr key={a.id}>
                                                        <td>
                                                            <strong>{t?.name || a.teacherName || '—'}</strong>
                                                            <div className="text-sm text-muted">{t?.email || a.teacherEmail}</div>
                                                        </td>
                                                        <td>{t?.phone || '—'}</td>
                                                        <td>
                                                            {t?.verified ? (
                                                                <span style={{ color: '#10b981', fontWeight: 700 }}>
                                                                    <i className="fas fa-check-circle"></i> Yes
                                                                </span>
                                                            ) : (
                                                                <span style={{ color: '#f59e0b', fontWeight: 700 }}>
                                                                    <i className="fas fa-clock"></i> No
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>{(a.createdAt || '').slice(0, 10)}</td>
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
            )}
        </div>
    );
};

export default ManageJobs;

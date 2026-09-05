import { useEffect, useMemo, useState } from 'react';
import './AdminForms.css';
import { getFirebaseDatabase, isFirebaseConfigured } from '../../lib/firebase';
import { subscribeList, updateItem } from '../../services/rtdb';

const ManageDemos = () => {
    const [demos, setDemos] = useState([]);
    const [loadError, setLoadError] = useState('');

    const db = useMemo(() => getFirebaseDatabase(), []);
    const firebaseReady = isFirebaseConfigured() && Boolean(db);

    useEffect(() => {
        if (!firebaseReady) return;
        const unsub = subscribeList(
            db,
            'demoRequests',
            (list) => {
                const sorted = [...list].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
                setDemos(sorted);
            },
            (err) => {
                console.error(err);
                setLoadError('Failed to load demo requests from database.');
            },
        );
        return () => unsub();
    }, [db, firebaseReady]);

    const handleStatusChange = async (id, nextStatus) => {
        if (!firebaseReady) return;
        setLoadError('');
        try {
            await updateItem(db, `demoRequests/${id}`, { status: nextStatus, updatedAt: new Date().toISOString() });
        } catch (e) {
            console.error(e);
            setLoadError('Failed to update status.');
        }
    };

    const formatDate = (iso) => {
        if (!iso) return '';
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return iso;
        return d.toISOString().slice(0, 10);
    };

    return (
        <div className="manage-page">
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Demo Requests</h1>
                    <p className="admin-page-subtitle">Track and manage callbacks for home tuition demos.</p>
                </div>
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
                                <th>Date</th>
                                <th>Parent/Student</th>
                                <th>Contact</th>
                                <th>Grade/Subject</th>
                                <th>Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {demos.map(demo => (
                                <tr key={demo.id}>
                                    <td>{formatDate(demo.createdAt)}</td>
                                    <td>
                                        <strong>{demo.parentName}</strong>
                                        <div className="text-sm text-muted">Child: {demo.studentName}</div>
                                    </td>
                                    <td>
                                        <a href={`tel:${demo.phone}`} className="text-primary">{demo.phone}</a>
                                    </td>
                                    <td>{demo.grade} - {demo.subject}</td>
                                    <td>
                                        <span className={`status-badge ${(demo.status || '').toLowerCase()}`}>
                                            {demo.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            className="status-dropdown"
                                            value={demo.status || 'Pending'}
                                            onChange={(e) => handleStatusChange(demo.id, e.target.value)}
                                            disabled={!firebaseReady}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Contacted">Contacted</option>
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageDemos;

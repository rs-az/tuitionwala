import { useEffect, useMemo, useState } from 'react';
import './AdminForms.css';
import '../teacher/TutorForm.css';
import { getFirebaseDatabase, isFirebaseConfigured } from '../../lib/firebase';
import { subscribeList, updateItem } from '../../services/rtdb';
import TutorProfileView from '../../components/tutor/TutorProfileView';

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [selected, setSelected] = useState(null);

  const db = useMemo(() => getFirebaseDatabase(), []);
  const firebaseReady = isFirebaseConfigured() && Boolean(db);

  useEffect(() => {
    if (!firebaseReady) return;
    const unsub = subscribeList(
      db,
      'teachers',
      (list) => {
        const sorted = [...list].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setTeachers(sorted);
      },
      (err) => {
        console.error(err);
        setLoadError('Failed to load teachers.');
      },
    );
    return () => unsub();
  }, [db, firebaseReady]);

  const toggleVerified = async (t) => {
    if (!firebaseReady) return;
    setLoadError('');
    try {
      await updateItem(db, `teachers/${t.uid}`, { verified: !t.verified });
    } catch (err) {
      console.error(err);
      setLoadError('Failed to update teacher.');
    }
  };

  return (
    <div className="manage-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Teachers</h1>
          <p className="admin-page-subtitle">Review full registration details and verify tutor profiles.</p>
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
                <th>Name</th>
                <th>Contact</th>
                <th>Locality</th>
                <th>Subjects</th>
                <th>Registration</th>
                <th>Verified</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.name || '—'}</strong>
                    <div className="text-sm text-muted">{t.email}</div>
                  </td>
                  <td>
                    {t.phone || '—'}
                    {t.whatsapp && <div className="text-sm text-muted">WA: {t.whatsapp}</div>}
                  </td>
                  <td>{t.locality || t.city || '—'}</td>
                  <td>{Array.isArray(t.subjects) ? t.subjects.join(', ') : '—'}</td>
                  <td>
                    {t.registrationCompleted ? (
                      <span style={{ color: '#10b981', fontWeight: 700 }}>Complete</span>
                    ) : (
                      <span style={{ color: '#f59e0b', fontWeight: 700 }}>Step {t.registrationStep || 0}/3</span>
                    )}
                  </td>
                  <td>
                    {t.verified ? (
                      <span style={{ color: '#10b981', fontWeight: 700 }}>
                        <i className="fas fa-check-circle"></i> Yes
                      </span>
                    ) : (
                      <span style={{ color: '#f59e0b', fontWeight: 700 }}>
                        <i className="fas fa-clock"></i> No
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-outline-primary btn-sm" onClick={() => setSelected(t)}>
                        View
                      </button>
                      <button className="btn btn-outline-primary btn-sm" onClick={() => toggleVerified(t)} disabled={!firebaseReady}>
                        {t.verified ? 'Unverify' : 'Verify'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" style={{ maxWidth: 920 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selected.name || 'Tutor'} — registration</h2>
              <button className="btn-close" onClick={() => setSelected(null)} aria-label="Close">
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <TutorProfileView profile={selected} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeachers;

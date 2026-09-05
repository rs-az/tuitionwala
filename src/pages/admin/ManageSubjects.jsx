import { useEffect, useMemo, useState } from 'react';
import './AdminForms.css';
import { getFirebaseDatabase, isFirebaseConfigured } from '../../lib/firebase';
import { createItem, deleteItem, subscribeList } from '../../services/rtdb';

const ManageSubjects = () => {
    const [categories, setCategories] = useState([]);
    const [loadError, setLoadError] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        title: '',
        description: '',
        subjectsCsv: '',
        icon: 'fa-book',
        color: 'var(--primary)',
    });

    const db = useMemo(() => getFirebaseDatabase(), []);
    const firebaseReady = isFirebaseConfigured() && Boolean(db);

    useEffect(() => {
        if (!firebaseReady) return;
        const unsub = subscribeList(
            db,
            'subjects/categories',
            (list) => {
                const normalized = list.map((c) => ({
                    ...c,
                    subjectCount: Array.isArray(c.subjects) ? c.subjects.length : 0,
                }));
                setCategories(normalized);
            },
            (err) => {
                console.error(err);
                setLoadError('Failed to load categories from database.');
            },
        );
        return () => unsub();
    }, [db, firebaseReady]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCreate = async () => {
        if (!firebaseReady) return;
        setLoadError('');
        try {
            const subjects = form.subjectsCsv
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);

            await createItem(db, 'subjects/categories', {
                title: form.title,
                description: form.description || '',
                subjects,
                icon: form.icon || 'fa-book',
                color: form.color || 'var(--primary)',
                status: 'active',
                createdAt: new Date().toISOString(),
            });
            setIsModalOpen(false);
            setForm({ title: '', description: '', subjectsCsv: '', icon: 'fa-book', color: 'var(--primary)' });
        } catch (e) {
            console.error(e);
            setLoadError('Failed to create category.');
        }
    };

    const handleDelete = async (id) => {
        if (!firebaseReady) return;
        if (!confirm('Delete this category?')) return;
        setLoadError('');
        try {
            await deleteItem(db, `subjects/categories/${id}`);
        } catch (e) {
            console.error(e);
            setLoadError('Failed to delete category.');
        }
    };

    return (
        <div className="manage-page">
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Manage Subjects</h1>
                    <p className="admin-page-subtitle">Organize tutoring categories and specific subjects offered.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} disabled={!firebaseReady}>
                    <i className="fas fa-plus"></i> Add Category
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
                                <th>Category Name</th>
                                <th>Total Subjects</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(cat => (
                                <tr key={cat.id}>
                                    <td><strong>{cat.title}</strong></td>
                                    <td>{cat.subjectCount} subjects listed</td>
                                    <td>
                                        <span className="status-badge active">Active</span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="btn-icon text-danger"
                                                aria-label="Delete category"
                                                title="Delete category"
                                                onClick={() => handleDelete(cat.id)}
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

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h2>Add New Subject Category</h2>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="admin-form">
                                <div className="form-group">
                                    <label>Category Title</label>
                                    <input name="title" type="text" placeholder="e.g. Competitive Exams" value={form.title} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Description (Optional)</label>
                                    <textarea
                                        name="description"
                                        rows="2"
                                        placeholder="Brief description of the category..."
                                        value={form.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Initial Subjects (comma separated)</label>
                                    <input
                                        name="subjectsCsv"
                                        type="text"
                                        placeholder="e.g. Physics, Chemistry, Maths"
                                        value={form.subjectsCsv}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Icon (FontAwesome class)</label>
                                        <input name="icon" type="text" placeholder="e.g. fa-trophy" value={form.icon} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Color</label>
                                        <input name="color" type="text" placeholder="e.g. #10b981" value={form.color} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={handleCreate} disabled={!firebaseReady}>Save Category</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageSubjects;

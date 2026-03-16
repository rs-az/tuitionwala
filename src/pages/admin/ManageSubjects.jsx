import { useState } from 'react';
import './AdminForms.css';

const ManageSubjects = () => {
    const [categories] = useState([
        { id: 1, name: "Primary (Class 1-5)", subjectCount: 5 },
        { id: 2, name: "Middle School (Class 6-8)", subjectCount: 6 },
        { id: 3, name: "High School (Class 9-10)", subjectCount: 6 },
        { id: 4, name: "Senior Secondary (Class 11-12)", subjectCount: 8 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="manage-page">
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Manage Subjects</h1>
                    <p className="admin-page-subtitle">Organize tutoring categories and specific subjects offered.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <i className="fas fa-plus"></i> Add Category
                </button>
            </div>

            <div className="admin-card">
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
                                    <td><strong>{cat.name}</strong></td>
                                    <td>{cat.subjectCount} subjects listed</td>
                                    <td>
                                        <span className="status-badge active">Active</span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon text-primary" aria-label="Edit subjects" title="Edit subjects">
                                                <i className="fas fa-list"></i>
                                            </button>
                                            <button className="btn-icon text-primary" aria-label="Edit category" title="Edit category">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn-icon text-danger" aria-label="Delete category" title="Delete category">
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
                                    <input type="text" placeholder="e.g. Competitive Exams" />
                                </div>
                                <div className="form-group">
                                    <label>Description (Optional)</label>
                                    <textarea rows="2" placeholder="Brief description of the category..."></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Initial Subjects (comma separated)</label>
                                    <input type="text" placeholder="e.g. Physics, Chemistry, Maths" />
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Save Category</button>
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

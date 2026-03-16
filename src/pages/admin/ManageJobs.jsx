import { useState } from 'react';
import './AdminForms.css';

const ManageJobs = () => {
    const [jobs] = useState([
        { id: "100465", area: "Kursi Road", grade: "8th", preference: "Female", status: "Active" },
        { id: "100454", area: "Matiyari", grade: "5th", preference: "Any", status: "Active" },
        { id: "100388", area: "Vikas Nagar", grade: "10th", preference: "Female", status: "Closed" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="manage-page">
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Manage Jobs</h1>
                    <p className="admin-page-subtitle">Post and manage home tuition teaching requirements.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <i className="fas fa-plus"></i> Add New Job
                </button>
            </div>

            <div className="admin-card">
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
                                    <td>{job.grade}</td>
                                    <td>{job.preference}</td>
                                    <td>
                                        <span className={`status-badge ${job.status.toLowerCase()}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon text-primary" aria-label="Edit" title="Edit">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn-icon text-danger" aria-label="Delete" title="Delete">
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
                                        <input type="text" placeholder="e.g. Gomti Nagar" />
                                    </div>
                                    <div className="form-group">
                                        <label>Parent Name</label>
                                        <input type="text" placeholder="Parent's Name" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Grade & Subject</label>
                                        <input type="text" placeholder="e.g. 10th - Science, Maths" />
                                    </div>
                                    <div className="form-group">
                                        <label>Tutor Preference</label>
                                        <select>
                                            <option>Any</option>
                                            <option>Female Tutor Preferred</option>
                                            <option>Male Tutor Preferred</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Specific Requirements</label>
                                    <textarea rows="3" placeholder="Describe any specific needs..."></textarea>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Post Job</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageJobs;

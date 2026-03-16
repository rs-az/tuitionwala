import { useState } from 'react';
import './AdminForms.css';

const ManageDemos = () => {
    const [demos] = useState([
        { id: 1, parentName: "Ravi Kumar", studentName: "Aaryan Kumar", phone: "9876543210", subject: "Mathematics", grade: "10th", status: "Pending", date: "2024-03-05" },
        { id: 2, parentName: "Priya Singh", studentName: "Riya Singh", phone: "9123456789", subject: "Science", grade: "8th", status: "Contacted", date: "2024-03-04" },
        { id: 3, parentName: "Amit Verma", studentName: "Neha Verma", phone: "8182837919", subject: "Physics", grade: "11th", status: "Scheduled", date: "2024-03-02" },
        { id: 4, parentName: "Neha Gupta", studentName: "Rahul Gupta", phone: "7000123456", subject: "English", grade: "6th", status: "Closed", date: "2024-03-01" },
    ]);

    return (
        <div className="manage-page">
            <div className="admin-page-header">
                <div>
                    <h1 className="admin-page-title">Demo Requests</h1>
                    <p className="admin-page-subtitle">Track and manage callbacks for home tuition demos.</p>
                </div>
            </div>

            <div className="admin-card">
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
                                    <td>{demo.date}</td>
                                    <td>
                                        <strong>{demo.parentName}</strong>
                                        <div className="text-sm text-muted">Child: {demo.studentName}</div>
                                    </td>
                                    <td>
                                        <a href={`tel:${demo.phone}`} className="text-primary">{demo.phone}</a>
                                    </td>
                                    <td>{demo.grade} - {demo.subject}</td>
                                    <td>
                                        <span className={`status-badge ${demo.status.toLowerCase()}`}>
                                            {demo.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            className="status-dropdown"
                                            defaultValue={demo.status}
                                            onChange={(e) => {
                                                // Normally this would be a state update + API call
                                                console.log(`Update ${demo.id} to ${e.target.value}`)
                                            }}
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

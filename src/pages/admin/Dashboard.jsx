import './Dashboard.css';

const Dashboard = () => {
    const stats = [
        { label: "Active Jobs", value: "42", icon: "fa-briefcase", color: "var(--primary)", trend: "+5 this week" },
        { label: "Pending Demos", value: "18", icon: "fa-calendar-alt", color: "#f59e0b", trend: "3 require action" },
        { label: "Registered Tutors", value: "1,240", icon: "fa-chalkboard-teacher", color: "#10b981", trend: "+12 this month" },
        { label: "Total Subjects", value: "85", icon: "fa-book", color: "#8b5cf6", trend: "Across 6 categories" },
    ];

    const recentDemos = [
        { id: 1, parent: "Ravi Kumar", subject: "Mathematics", grade: "10th", date: "Today", status: "Pending" },
        { id: 2, parent: "Priya Singh", subject: "Science", grade: "8th", date: "Yesterday", status: "Contacted" },
        { id: 3, parent: "Amit Verma", subject: "Physics", grade: "11th", date: "2 days ago", status: "Scheduled" },
    ];

    return (
        <div className="admin-dashboard">
            <div className="admin-page-header">
                <h1 className="admin-page-title">Dashboard Overview</h1>
                <button className="btn btn-primary"><i className="fas fa-plus"></i> Post New Job</button>
            </div>

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
                                {recentDemos.map(demo => (
                                    <tr key={demo.id}>
                                        <td>
                                            <strong>{demo.parent}</strong>
                                        </td>
                                        <td>{demo.subject} ({demo.grade})</td>
                                        <td>{demo.date}</td>
                                        <td>
                                            <span className={`status-badge ${demo.status.toLowerCase()}`}>
                                                {demo.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-icon" aria-label="View Details">
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
                        <button className="action-btn">
                            <i className="fas fa-briefcase text-primary"></i>
                            <span>Post New Job</span>
                        </button>
                        <button className="action-btn">
                            <i className="fas fa-envelope-open-text" style={{ color: '#f59e0b' }}></i>
                            <span>Review Demos</span>
                        </button>
                        <button className="action-btn">
                            <i className="fas fa-book-medical" style={{ color: '#10b981' }}></i>
                            <span>Add Subject</span>
                        </button>
                        <button className="action-btn">
                            <i className="fas fa-cog" style={{ color: '#6b7280' }}></i>
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

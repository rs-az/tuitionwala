import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './JobsCarousel.css';
import { getFirebaseDatabase, isFirebaseConfigured } from '../lib/firebase';
import { setItem, subscribeList } from '../services/rtdb';
import { useTeacherAuth } from '../context/TeacherAuthContext';

const JobsCarousel = () => {
    const navigate = useNavigate();
    const { user, profile } = useTeacherAuth();
    const [jobs, setJobs] = useState([]);

    const db = useMemo(() => getFirebaseDatabase(), []);
    const firebaseReady = isFirebaseConfigured() && Boolean(db);

    useEffect(() => {
        if (!firebaseReady) return;
        const unsub = subscribeList(db, 'jobPosts', (list) => {
            const active = list
                .filter((j) => (j.status || 'active') === 'active')
                .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
                .slice(0, 8)
                .map((j) => ({
                    id: j.id,
                    area: j.area,
                    parent: j.parentName,
                    class: j.classAndSubject,
                    preference: j.preference,
                    requirement: j.requirement,
                }));
            setJobs(active);
        });
        return () => unsub();
    }, [db, firebaseReady]);

    const applyToJob = async (job) => {
        if (!user) {
            navigate(`/teacher/login?next=/jobs?job=${job.id}`);
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

            await setItem(db, `jobApplications/${job.id}/${user.uid}`, payload);
            await setItem(db, `teacherApplications/${user.uid}/${job.id}`, payload);
            alert('Applied successfully. We will contact you if shortlisted.');
        } catch (err) {
            console.error(err);
            alert('Failed to apply. Please try again.');
        }
    };

    // We duplicate the array to create a seamless infinite scroll effect
    const repeatedJobs = [...jobs, ...jobs];

    return (
        <section id="jobs" className="jobs-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Latest <span className="text-gradient">Tuition Jobs</span></h2>
                    <p className="section-subtitle">
                        Are you a passionate educator? Browse our latest home tuition requirements and start teaching today!
                    </p>
                </div>

                <div className="carousel-container">
                    <div className="carousel-track">
                        {repeatedJobs.map((job, index) => (
                            <div className="job-card" key={`${job.id}-${index}`}>
                                <div className="job-header">
                                    <span className="job-id">Job #{job.id}</span>
                                    <span className="job-badge">New</span>
                                </div>

                                <div className="job-body">
                                    <div className="job-row">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <strong>Area:</strong> {job.area}
                                    </div>
                                    <div className="job-row">
                                        <i className="fas fa-book-reader"></i>
                                        <strong>For:</strong> {job.class}
                                    </div>
                                    <div className="job-row">
                                        <i className="fas fa-user-check"></i>
                                        <strong>Pref:</strong> {job.preference}
                                    </div>
                                    <div className="job-req">
                                        <i className="fas fa-tasks"></i>
                                        <p>{job.requirement}</p>
                                    </div>
                                </div>

                                <div className="job-footer">
                                    <button className="btn btn-primary btn-sm" onClick={() => applyToJob(job)} disabled={Boolean(user) && !profile?.verified}>
                                        Apply Now
                                    </button>
                                    <Link className="btn btn-outline-primary btn-sm" to={`/jobs?job=${job.id}`}>View Details</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-xl">
                    <Link className="btn btn-secondary" to="/jobs">View All Jobs</Link>
                </div>
            </div>
        </section>
    );
};

export default JobsCarousel;

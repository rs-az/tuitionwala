import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './ExploreSubjects.css';
import { getFirebaseDatabase, isFirebaseConfigured } from '../lib/firebase';
import { subscribeList } from '../services/rtdb';

const ExploreSubjects = () => {
    const [categories, setCategories] = useState([]);
    const [loadError, setLoadError] = useState('');

    const db = useMemo(() => getFirebaseDatabase(), []);
    const firebaseReady = isFirebaseConfigured() && Boolean(db);

    useEffect(() => {
        if (!firebaseReady) return;
        const unsub = subscribeList(
            db,
            'subjects/categories',
            (list) => {
                const active = list
                    .filter((c) => (c.status || 'active') === 'active')
                    .sort((a, b) => (a.title || '').localeCompare(b.title || ''));
                setCategories(active);
            },
            (err) => {
                console.error(err);
                setLoadError('Failed to load subjects.');
            },
        );
        return () => unsub();
    }, [db, firebaseReady]);

    return (
        <div className="page-container explore-subjects-page">
            <div className="explore-header-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h1 className="page-title">Explore <span className="text-gradient">Our Subjects</span></h1>
                        <p className="page-subtitle max-w-3xl mx-auto">
                            We offer comprehensive home tuition across all major boards (CBSE, ICSE, State Boards) for a wide range of subjects.
                            Find the perfect subject expert to guide your academic journey.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                {!firebaseReady && (
                    <div className="text-muted" style={{ margin: '12px 0' }}>
                        Firebase is not configured. Add your keys to `.env.local` (see `.env.example`) and restart the dev server.
                    </div>
                )}
                {loadError && (
                    <div className="text-danger" style={{ margin: '12px 0' }}>
                        {loadError}
                    </div>
                )}
                <div className="subjects-grid">
                    {categories.map((category, index) => (
                        <div className="subject-category-card" key={index}>
                            <div className="category-header">
                                <div className="category-icon" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                                    <i className={`fas ${category.icon || 'fa-book'}`}></i>
                                </div>
                                <h2>{category.title}</h2>
                            </div>
                            <p className="category-desc">{category.description}</p>

                            <div className="subject-tags">
                                {(category.subjects || []).map((subject, idx) => (
                                    <span className="subject-tag" key={idx}>{subject}</span>
                                ))}
                            </div>

                            <div className="category-footer">
                                <Link to="/book-demo" className="btn btn-outline-primary btn-sm btn-full">Find Tutor</Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cta-banner mt-xxl">
                    <div className="cta-banner-content">
                        <h2>Didn't find what you're looking for?</h2>
                        <p>Our network includes 120,000+ home tutors. Let us know your specific requirement and we'll find the perfect match.</p>
                        <Link to="/book-demo" className="btn btn-light mt-md">Request Specific Subject</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreSubjects;

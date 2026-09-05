import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useTeacherAuth } from '../context/TeacherAuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useTeacherAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    <span className="text-gradient">Tuition</span>wala
                </Link>

                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link to="/explore-subjects" onClick={() => setIsMobileMenuOpen(false)}>Explore Subjects</Link>
                    <Link to="/jobs" onClick={() => setIsMobileMenuOpen(false)}>Jobs</Link>
                    {user ? (
                        <Link to="/teacher/profile" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                    ) : (
                        <Link to="/teacher/register" onClick={() => setIsMobileMenuOpen(false)}>Become a Tutor</Link>
                    )}
                    <Link to="/book-demo" className="btn btn-primary d-mobile" onClick={() => setIsMobileMenuOpen(false)}>Book Demo</Link>
                </div>

                <div className="nav-actions">
                    {user ? (
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={async () => {
                                await logout();
                                navigate('/');
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/teacher/login" className="btn btn-outline-primary">Login</Link>
                    )}
                    <Link to="/book-demo" className="btn btn-primary">Book Demo</Link>
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

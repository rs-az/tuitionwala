import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="container hero-container">
                <div className="hero-content animate-fade-in-up">
                    <div className="badge">Trusted by 10,000+ Students</div>
                    <h1 className="hero-title">
                        Personalized Home Tuition for <span className="text-gradient">Every Board & Subject</span>
                    </h1>
                    <p className="hero-subtitle">
                        Connect with expert local teachers for one-on-one home tuition.
                        Quality education at your doorstep with reliable and vetted tutors.
                    </p>
                    <div className="hero-cta">
                        <Link to="/book-demo" className="btn btn-primary">Book a Free Demo</Link>
                        <Link to="/explore-subjects" className="btn btn-secondary">Explore Courses</Link>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Expert Tutors</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">10k+</span>
                            <span className="stat-label">Happy Students</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">4.9/5</span>
                            <span className="stat-label">Average Rating</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <div className="hero-shape"></div>
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Students learning online"
                        className="hero-image animate-float"
                    />
                    <div className="floating-card card-1 animate-float" style={{ animationDelay: '1s' }}>
                        <div className="card-icon"><i className="fas fa-book-open" style={{ color: 'var(--primary)' }}></i></div>
                        <div className="card-text">All Boards</div>
                    </div>
                    <div className="floating-card card-2 animate-float" style={{ animationDelay: '2s' }}>
                        <div className="card-icon"><i className="fas fa-user-graduate" style={{ color: 'var(--secondary)' }}></i></div>
                        <div className="card-text">1-on-1 Classes</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

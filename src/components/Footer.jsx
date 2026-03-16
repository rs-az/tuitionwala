import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a href="/" className="logo footer-logo">
                            <span className="text-gradient">Tuition</span>wala
                        </a>
                        <p className="footer-desc">
                            Empowering students with quality education through personalized,
                            expert matching for one-on-one home tuition.
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#features">About Us</a></li>
                            <li><a href="#courses">Courses</a></li>
                            <li><a href="#testimonials">Testimonials</a></li>
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h4 className="footer-title">Classes</h4>
                        <ul className="footer-links">
                            <li><a href="#">Class 6 - 8</a></li>
                            <li><a href="#">Class 9 - 10</a></li>
                            <li><a href="#">Class 11 - 12</a></li>
                            <li><a href="#">Competitive Exams</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4 className="footer-title">Contact Us</h4>
                        <ul className="contact-info">
                            <li><i className="fas fa-phone-alt"></i> +91 81828 37919</li>
                            <li><i className="fas fa-envelope"></i> info@tuitionwala.in</li>
                            <li><i className="fas fa-map-marker-alt"></i> TuitionWala 19A_Allebgang Near Church, Prabhu Enclave Prayagraj</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Tuitionwala. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

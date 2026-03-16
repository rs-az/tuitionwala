import { useState } from 'react';
import './BookDemo.css';

const BookDemo = () => {
    const [formData, setFormData] = useState({
        parentName: '',
        studentName: '',
        phone: '',
        grade: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        alert('Thank you! Your demo request has been received. Our team will contact you shortly.');
        setFormData({ parentName: '', studentName: '', phone: '', grade: '', subject: '', message: '' });
    };

    return (
        <div className="page-container book-demo-page">
            <div className="container">
                <div className="book-demo-layout">
                    <div className="book-demo-content">
                        <span className="badge">Free Demo Class</span>
                        <h1 className="page-title">Experience <span className="text-gradient">Premium Home Tuition</span></h1>
                        <p className="page-subtitle">
                            Not sure if home tuition is the right fit? Book a free demo class today and experience our personalized teaching methodology firsthand.
                        </p>

                        <ul className="benefits-list">
                            <li><i className="fas fa-check-circle"></i> 1-on-1 personalized attention</li>
                            <li><i className="fas fa-check-circle"></i> Highly qualified local teachers</li>
                            <li><i className="fas fa-check-circle"></i> Flexible scheduling at your home</li>
                            <li><i className="fas fa-check-circle"></i> Customized study plans for every student</li>
                        </ul>

                        <div className="contact-quick">
                            <p>Need immediate assistance?</p>
                            <a href="tel:+918182837919" className="btn btn-outline-primary">
                                <i className="fas fa-phone-alt"></i> +91 81828 37919
                            </a>
                        </div>
                    </div>

                    <div className="book-demo-form-wrapper">
                        <div className="form-card">
                            <h2>Book Your Free Demo</h2>
                            <form onSubmit={handleSubmit} className="demo-form">
                                <div className="form-group row">
                                    <div className="col">
                                        <label htmlFor="parentName">Parent's Name *</label>
                                        <input type="text" id="parentName" name="parentName" value={formData.parentName} onChange={handleChange} required placeholder="Enter parent's name" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="studentName">Student's Name *</label>
                                        <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleChange} required placeholder="Enter student's name" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number *</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-digit mobile number" pattern="[0-9]{10}" />
                                </div>

                                <div className="form-group row">
                                    <div className="col">
                                        <label htmlFor="grade">Class/Grade *</label>
                                        <select id="grade" name="grade" value={formData.grade} onChange={handleChange} required>
                                            <option value="">Select Class</option>
                                            <option value="1-5">Class 1 to 5</option>
                                            <option value="6-8">Class 6 to 8</option>
                                            <option value="9-10">Class 9 to 10</option>
                                            <option value="11-12">Class 11 to 12</option>
                                            <option value="competitive">Competitive Exams</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="subject">Subject *</label>
                                        <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
                                            <option value="">Select Subject</option>
                                            <option value="all">All Subjects</option>
                                            <option value="math">Mathematics</option>
                                            <option value="science">Science</option>
                                            <option value="english">English</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Any specific requirements? (Optional)</label>
                                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Tell us about the student's learning needs..."></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-full">Request Demo Call</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDemo;

import './LocationMap.css';

const LocationMap = () => {
    return (
        <section id="location" className="location-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Visit <span className="text-gradient">Our Office</span></h2>
                    <p className="section-subtitle">
                        Prefer a face-to-face consultation? Drop by our office or give us a call to
                        discuss the best home tuition plan for your child.
                    </p>
                </div>

                <div className="location-grid">
                    <div className="contact-details">
                        <div className="contact-card">
                            <div className="contact-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="contact-info">
                                <h3>Our Location</h3>
                                <p>TuitionWala 19A_Allebgang Near Church<br />Prabhu Enclave Prayagraj</p>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className="contact-info">
                                <h3>Call Us</h3>
                                <p>+91 81828 37919</p>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">
                                <i className="fab fa-whatsapp"></i>
                            </div>
                            <div className="contact-info">
                                <h3>WhatsApp</h3>
                                <p>Chat with our counselors 24/7<br />+91 81828 37919</p>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="contact-info">
                                <h3>Email</h3>
                                <p>info@tuitionwala.in<br />support@tuitionwala.in</p>
                            </div>
                        </div>
                    </div>

                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.822851897089!2d81.82393307525381!3d25.444211623405763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398535ab51bf82e3%3A0xbd8ba85a9dfbacf1!2sPrabhu%20Enclave!5e0!3m2!1sen!2sin!4v1709740111111!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Tuitionwala Office Location"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationMap;

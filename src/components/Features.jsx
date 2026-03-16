import './Features.css';

const Features = () => {
    const features = [
        {
            icon: <i className="fas fa-chalkboard-teacher"></i>,
            title: "1-on-1 Personalized Classes",
            description: "Get undivided attention from top teachers with customized learning plans suited to each student's pace."
        },
        {
            icon: <i className="far fa-clock"></i>,
            title: "Flexible Timings",
            description: "Learn anytime, anywhere. Schedule classes according to your convenience and comfort."
        },
        {
            icon: <i className="fas fa-globe"></i>,
            title: "All Boards Covered",
            description: "CBSE, ICSE, State Boards, and specialized exam preparation. We have expert tutors for every requirement."
        },
        {
            icon: <i className="fas fa-lightbulb"></i>,
            title: "Interactive In-Person Learning",
            description: "Direct face-to-face guidance, immediate doubt-clearing, and regular assessments to track progress."
        }
    ];

    return (
        <section id="features" className="features-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Why Choose <span className="text-gradient">Tuitionwala</span>?</h2>
                    <p className="section-subtitle">
                        We connect you with the best local teachers who come directly to your home,
                        ensuring safe and top-quality face-to-face education.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

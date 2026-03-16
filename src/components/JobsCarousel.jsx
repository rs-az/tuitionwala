import './JobsCarousel.css';

const JobsCarousel = () => {
    const jobs = [
        {
            id: "100465",
            area: "Kursi Road, Lucknow",
            parent: "Aastha Srivastava",
            class: "8th - All Subjects",
            preference: "Female Tutor",
            requirement: "Want teacher for class 8th (DPS). Need a good explainer."
        },
        {
            id: "100454",
            area: "Matiyari, Lucknow",
            parent: "Akansha Bora",
            class: "5th - All Subjects",
            preference: "Any",
            requirement: "Want teacher for both of my wards. Should be patient."
        },
        {
            id: "100388",
            area: "Vikas Nagar, Lucknow",
            parent: "Manisha",
            class: "10th - Science, Maths",
            preference: "Female Tutor",
            requirement: "Need a good experienced teacher having good board exam track record."
        },
        {
            id: "100386",
            area: "Indira Nagar, Lucknow",
            parent: "Sneha Rai",
            class: "IIT-JEE - Mathematics",
            preference: "Any",
            requirement: "Expert in derivation and deep knowledge required."
        },
        {
            id: "100369",
            area: "Gomti Nagar - Vastu Khand",
            parent: "Aanya Gupta",
            class: "10th - Maths, Physics",
            preference: "Any",
            requirement: "Need a good teacher who is expert in maths and science."
        },
        {
            id: "100360",
            area: "Indira Nagar, Lucknow",
            parent: "Aruna Anand",
            class: "1st & 2nd - All Subjects",
            preference: "Female Tutor",
            requirement: "Need a good female teacher for my children who can handle kids well."
        }
    ];

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
                                    <button className="btn btn-primary btn-sm">Apply Now</button>
                                    <button className="btn btn-outline-primary btn-sm">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-xl">
                    <button className="btn btn-secondary">View All 500+ Jobs</button>
                </div>
            </div>
        </section>
    );
};

export default JobsCarousel;

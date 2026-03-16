import './Courses.css';

const Courses = () => {
    const courses = [
        {
            title: "Class 10 CBSE",
            subjects: "Math, Science, English",
            level: "Secondary",
            color: "var(--primary)"
        },
        {
            title: "Class 12 Science",
            subjects: "Physics, Chem, Math/Bio",
            level: "Higher Secondary",
            color: "var(--secondary)"
        },
        {
            title: "Spoken English",
            subjects: "Grammar, Vocabulary, Fluency",
            level: "All Ages",
            color: "#10b981" /* Emerald */
        },
        {
            title: "Coding for Kids",
            subjects: "Scratch, Python, Web",
            level: "Beginner",
            color: "#8b5cf6" /* Violet */
        },
        {
            title: "NEET Foundation",
            subjects: "Biology, Chemistry, Physics",
            level: "Competitive Competitive",
            color: "#f59e0b" /* Amber */
        },
        {
            title: "IIT JEE Prep",
            subjects: "Advanced Math & Science",
            level: "Competitive",
            color: "#ef4444" /* Red */
        }
    ];

    return (
        <section id="courses" className="courses-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Popular <span className="text-gradient">Courses & Subjects</span></h2>
                    <p className="section-subtitle">
                        Find the perfect tutor for your academic needs, from school curriculum to competitive exams.
                    </p>
                </div>

                <div className="courses-grid">
                    {courses.map((course, index) => (
                        <div className="course-card" key={index}>
                            <div
                                className="course-color-bar"
                                style={{ backgroundColor: course.color }}
                            ></div>
                            <div className="course-content">
                                <span className="course-level" style={{ color: course.color }}>{course.level}</span>
                                <h3 className="course-title">{course.title}</h3>
                                <p className="course-subjects">{course.subjects}</p>
                                <button className="btn btn-outline-primary course-btn">View Details Options &rarr;</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-xl">
                    <button className="btn btn-primary">Explore All Courses</button>
                </div>
            </div>
        </section>
    );
};

export default Courses;

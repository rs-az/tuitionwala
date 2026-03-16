import { Link } from 'react-router-dom';
import './ExploreSubjects.css';

const ExploreSubjects = () => {
    const categories = [
        {
            title: "Primary (Class 1-5)",
            description: "Building a strong foundation in core subjects with interactive learning.",
            subjects: ["All Subjects", "Mathematics", "EVS / Science", "English", "Hindi"],
            icon: "fa-child",
            color: "var(--primary)"
        },
        {
            title: "Middle School (Class 6-8)",
            description: "Developing conceptual clarity and critical thinking skills.",
            subjects: ["Mathematics", "Science", "English", "Social Studies", "Hindi", "Computer Science"],
            icon: "fa-book-open",
            color: "#10b981" // emerald
        },
        {
            title: "High School (Class 9-10)",
            description: "Comprehensive preparation for board exams with expert guidance.",
            subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Social Science"],
            icon: "fa-graduation-cap",
            color: "#f59e0b" // amber
        },
        {
            title: "Senior Secondary (Class 11-12)",
            description: "Specialized tutoring for science, commerce, and humanities streams.",
            subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Accountancy", "Economics", "Business Studies", "History"],
            icon: "fa-university",
            color: "#ef4444" // red
        },
        {
            title: "Competitive Exams",
            description: "Targeted coaching for top-tier entrance examinations.",
            subjects: ["IIT-JEE (Mains & Advanced)", "NEET", "CUET", "NDA", "Olympiads"],
            icon: "fa-trophy",
            color: "#8b5cf6" // violet
        },
        {
            title: "Spoken English & Skills",
            description: "Enhance communication, personality, and specialized skills.",
            subjects: ["Spoken English", "Personality Development", "French / German", "Coding for Kids"],
            icon: "fa-language",
            color: "#ec4899" // pink
        }
    ];

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
                <div className="subjects-grid">
                    {categories.map((category, index) => (
                        <div className="subject-category-card" key={index}>
                            <div className="category-header">
                                <div className="category-icon" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
                                    <i className={`fas ${category.icon}`}></i>
                                </div>
                                <h2>{category.title}</h2>
                            </div>
                            <p className="category-desc">{category.description}</p>

                            <div className="subject-tags">
                                {category.subjects.map((subject, idx) => (
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

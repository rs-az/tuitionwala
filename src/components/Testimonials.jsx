import './Testimonials.css';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Rahul Sharma",
            role: "Class 10 Student",
            image: "https://i.pravatar.cc/150?img=11",
            quote: "The personalized attention I got here helped me score 95% in my board exams. My math tutor was exceptional!"
        },
        {
            name: "Priya Patel",
            role: "Parent",
            image: "https://i.pravatar.cc/150?img=5",
            quote: "We struggled to find a good science teacher locally. Tuitionwala connected us with a brilliant tutor from Delhi who clear all concepts."
        },
        {
            name: "Amit Kumar",
            role: "JEE Aspirant",
            image: "https://i.pravatar.cc/150?img=33",
            quote: "The flexible timings allowed me to balance schooling with rigorous JEE prep. Highly recommend the physics faculty."
        }
    ];

    return (
        <section id="testimonials" className="testimonials-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">What Our <span className="text-gradient">Students Say</span></h2>
                    <p className="section-subtitle">
                        Don't just take our word for it. Read the success stories of students who transformed their learning journey.
                    </p>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div className="testimonial-card" key={index}>
                            <div className="quote-icon">"</div>
                            <p className="testimonial-quote">"{testimonial.quote}"</p>
                            <div className="testimonial-author">
                                <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                                <div className="author-info">
                                    <h4 className="author-name">{testimonial.name}</h4>
                                    <span className="author-role">{testimonial.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

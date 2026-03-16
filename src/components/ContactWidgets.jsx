import './ContactWidgets.css';

const ContactWidgets = () => {
    const phoneNumber = "+918182837919";
    const whatsappNumber = "918182837919";
    const whatsappMessage = encodeURIComponent("Hello Tuitionwala, I would like to book a home tuition demo.");

    return (
        <div className="contact-widgets">
            <a
                href={`tel:${phoneNumber}`}
                className="widget-btn call-btn"
                aria-label="Call Us"
            >
                <i className="fas fa-phone-alt"></i>
            </a>

            <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                className="widget-btn whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Us"
            >
                <i className="fab fa-whatsapp"></i>
            </a>
        </div>
    );
};

export default ContactWidgets;

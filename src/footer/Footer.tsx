import "./Footer.styles.css";

const Footer = () => {
    return (
        <div className="footer">
            <p className="footer__text">Challenge by</p>
            <a
                href="https://www.frontendmentor.io?ref=challenge"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
            >
                Frontend Mentor
            </a>
            <p className="footer__text">Coded by</p>
            <a
                href="https://github.com/DDM-projects"
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
            >
                DDM-projects
            </a>
        </div>
    );
};

export default Footer;

import LogoFooter from "./LogoFooter";

const Footer = () => {
    return (
        <footer className="footer">
            <LogoFooter />
            <div className="footer__link-container">
                <ul className="info">
                    <li>Blog</li>
                    <li>A propos</li>
                    <li>Contact</li>
                </ul>
                <ul className="settings">
                    <li>Securité</li>
                    <li>Confidentialité</li>
                    <li>Conditions d'utilisations</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

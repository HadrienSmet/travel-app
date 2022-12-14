import LogoFooter from "./LogoFooter";

const Footer = () => {
    return (
        <footer className="footer">
            <LogoFooter />
            <div className="footer__link-container">
                <ul className="info">
                    <li><a href="/error404">Blog</a></li>
                    <li><a href="/error404">A propos</a></li>
                    <li><a href="/error404">Contact</a></li>
                </ul>
                <ul className="settings">
                    <li><a href="/error404">SecuritÃ©</a></li>
                    <li><a href="/error404">ConfidentialitÃ©</a></li>
                    <li><a href="/error404">Conditions d'utilisations</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;

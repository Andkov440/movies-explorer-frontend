import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className="footer__container">
                <p className="footer__copyright">&copy; 2022</p>
                <nav className="footer__nav">
                    <ul className="footer__nav-list">
                        <li className="footer__nav-item">
                            <a className="footer__nav-link" href="src/components/Footer/Footer" target="_blank"
                               rel="noreferrer">Яндекс.Практикум</a>
                        </li>
                        <li className="footer__nav-item">
                            <a className="footer__nav-link" href="src/components/Footer/Footer" target="_blank"
                               rel="noreferrer">Github</a>
                        </li>
                        <li className="footer__nav-item">
                            <a className="footer__nav-link" href="src/components/Footer/Footer" target="_blank"
                               rel="noreferrer">Facebook</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__wrapper">
        <p className="footer__copyright">&copy; 2022</p>
        <nav className="footer__nav">
          <ul className="footer__nav-list">
            <li className="footer__nav-item">
              <a
                className="footer__nav-link"
                href="https://practicum.yandex.ru/profile/web/"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__nav-item">
              <a
                className="footer__nav-link"
                href="facebook.com"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className="footer__nav-item">
              <a
                className="footer__nav-link"
                href="github.com"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import './Portfolio.css';

const Portfolio = (props) => {
    return (
        <section className="portfolio">
            <h4 className="portfolio__title">Портфолио</h4>
            <ul className="portfolio__links">
                <li className="portfolio__link">
                    <a className="portfolio__item"
                       href="https://github.com/andkov440/how-to-learn"
                       target="_blank"
                       rel="noreferrer">
                        <p className="portfolio__site">Статичный сайт</p>
                        <div className="portfolio__arrow">↗</div>
                    </a>
                </li>
                <li className="portfolio__link">
                    <a className="portfolio__item"
                       href="https://github.com/andkov440/russian-travel/"
                       target="_blank"
                       rel="noreferrer">
                        <p className="portfolio__site">Адаптивный сайт</p>
                        <div className="portfolio__arrow">↗
                        </div>
                    </a>
                </li>
                <li className="portfolio__link">
                    <a className="portfolio__item"
                       href="https://github.com/andkov440/mesto-react/"
                       target="_blank"
                       rel="noreferrer">
                        <p className="portfolio__site">Одностраничное приложение</p>
                        <div className="portfolio__arrow">↗</div>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;

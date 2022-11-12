import React from "react";
import './Techs.css';

const Techs = (props) => {
    return (
        <section className="techs">
            <h3 className="main__section-title landing__section-title_70">Технологии</h3>
            <h2 className="techs__title">7 технологий</h2>
            <p className="techs__description">
                На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__techsnology">
                <li className="techs__item">HTML</li>
                <li className="techs__item">CSS</li>
                <li className="techs__item">JS</li>
                <li className="techs__item">React</li>
                <li className="techs__item">Git</li>
                <li className="techs__item">Express.js</li>
                <li className="techs__item">mongoDB</li>
            </ul>
        </section>
    );
}

export default Techs;

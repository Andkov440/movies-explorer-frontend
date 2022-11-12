import React from "react";
import { useState } from 'react';
import './AboutProject.css';

const AboutProject = () => {
    return (
        <section className="about-project">
            <h2 className="main__section-title">О проекте</h2>
            <ul className="about-project__content">
                <li className="about-project__stage-table">
                    <h3 className="stage-table__title">Дипломный проект включал 5 этапов</h3>
                    <p className="stage-table__text">Составление плана, работу над бэкендом, вёрстку, добавление
                        функциональности и финальные доработки.
                    </p>
                </li>
                <li className="about-project__stage-table">
                    <h3 className="stage-table__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="stage-table__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
                        было соблюдать, чтобы успешно защититься.
                    </p>
                </li>
            </ul>
            <ul className="about-project__time-table">
                <li className="about-project__table-item about-project__table-item_green ">
                    <h3 className="time-table__title">1 неделя</h3>
                </li>
                <li className="about-project__table-item about-project__table-item_grey">
                    <h3 className="time-table__title">4 недели</h3>
                </li>
                <li className="about-project__table-item">
                    <p className="time-table__description">Back-end</p>
                </li>
                <li className="about-project__table-item">
                    <p className="time-table__description">Front-end</p>
                </li>
            </ul>
        </section>
    );
}

export default AboutProject;

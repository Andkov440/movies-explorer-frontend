import React from "react";
import "./AboutMe.css";
import avatar from "../../images/student.png";
import Portfolio from "../Portfolio/Portfolio";

const AboutMe = () => {
  return (
    <section className="about-me">
      <h3 className="main__section-title">Студент</h3>
      <div className="about-me__content">
        <div className="about-me__info">
          <h3 className="about-me__title">Виталий</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <ul className="about-me__links">
            <li>
              <a
                className="about-me__link"
                href="src/components/Main/Main.js"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                className="about-me__link"
                href="src/components/Main/Main.js"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img src={avatar} alt="about-me" className="about-me__avatar" />
      </div>
      <Portfolio />
    </section>
  );
};

export default AboutMe;

import "./NavTab.css";
import React from "react";
import { Link } from "react-scroll";

const NavTab = () => {
  return (
    <ul className="nav-tab__links">
      <li className="nav-tab__link">
        <Link to="about-project" className="nav-tab__link">
          О проекте
        </Link>
      </li>
      <li className="nav-tab__link">
        <Link to="techs" className="nav-tab__link">
          Технологии
        </Link>
      </li>
      <li className="nav-tab__link">
        <Link to="about-me" className="nav-tab__link">
          Студент
        </Link>
      </li>
    </ul>
  );
};

export default NavTab;

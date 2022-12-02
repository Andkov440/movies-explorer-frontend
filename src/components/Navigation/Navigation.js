import "./Navigation.css";
import { Link } from "react-router-dom";

const Navigation = (props) => {
  return (
    <nav
      className={`navigation__menu ${
        props.showItems ? "navigation__menu_active" : ""
      }`}
    >
      <ul className="navigation__list">
        <li className="">
          <Link to="/" className="navigation__link">
            Главная
          </Link>
        </li>
        <li className="">
          <Link to="/movies" className="navigation__link">
            Фильмы
          </Link>
        </li>
        <li className="">
          <Link to="/saved-movies" className="navigation__link">
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <button
        className="navigation__profile-button"
        type="button"
        onClick={props.onClick}
      >
        <Link to="/profile" className="navigation__profile-link">
          Аккаунт
        </Link>
      </button>
    </nav>
  );
};

export default Navigation;

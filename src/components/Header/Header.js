import "./Header.css";
import { Link } from "react-router-dom";
import headerLogo from "../../images/header_logo.svg";
import NavAuth from "../NavAuth/NavAuth";
import Navigation from "../Navigation/Navigation";

const Header = (props) => {
  return (
    <header className="header">
      <div
        className={`header__body-auth-on ${
          props.authOn ? "header__body-auth-on_active" : ""
        }`}
      >
        <Link to="/landing" className="header__link">
          <img
            className="header__logo header__logo_auth-off"
            src={headerLogo}
            alt="логотип"
          />
        </Link>
        <div className="header__wrapper">
          <Navigation
            showItems={props.showItems}
            onClick={props.handleToggleMenu}
          />
        </div>
        <button
          className={`header__burger ${
            props.showItems ? "header__burger_active" : ""
          }`}
          onClick={props.handleToggleMenu}
        >
          <span
            className={`${props.showItems ? "header__burger_active" : ""}`}
          ></span>
        </button>
      </div>
      <NavAuth authOn={props.authOn} onClick={props.handleToggleMenu} />
    </header>
  );
};

export default Header;

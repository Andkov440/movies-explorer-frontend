import React, { useState } from "react";
import headerLogo from "../../images/header_logo.svg";
import { Link } from "react-router-dom";
import isEmail from "validator/es/lib/isEmail";
import "../Form/Form.css";

function Login({ onLogin }) {
  const [inputValues, setInputValues] = useState({});

  
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(inputValues);
  }

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    if (name === "email") {
      if (!isEmail(value)) {
        target.setCustomValidity("Некорректый адрес электронной почты");
      } else {
        target.setCustomValidity("");
      }
    }

    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  return (
    <section className="form">
      <div className="form__wrapper">
        <Link to="/" className="form__link">
          <img className="form__logo" src={headerLogo} alt="логотип"></img>
        </Link>
        <h2 className="form__title">Рады видеть!</h2>
        <form
          className="form__content"
          onSubmit={handleSubmit}
          name="form-login"
        >
          <div className="form__inputs">
            <label className="form__item">
              <p className="form__label">E-mail</p>
              <input
                className="form__input"
                type="email"
                name="email"
                placeholder="pochta@yandex.ru"
                value={inputValues.email || ""}
                required
                onChange={handleInputChange}
              />
              <p
                className={`form__error ${
                  errors.email ? "form__error-display" : ""
                }`}
              >
                {errors.email}
              </p>
            </label>
            <label className="form__item">
              <p className="form__label">Пароль</p>
              <input
                className="form__input"
                type="password"
                name="password"
                placeholder=""
                value={inputValues.password || ""}
                minLength="2"
                required
                onChange={handleInputChange}
              />
              <p
                className={`form__error ${
                  errors.password ? "form__error-display" : ""
                }`}
              >
                {errors.password}
              </p>
            </label>
          </div>
          <button
            className={`form__button ${isValid ? "" : "form__button_disabled"}`}
            type="submit"
            disabled={!isValid ? true : ""}
          >
            Войти
          </button>
          <p className="form__text">
            {" "}
            Ещё не зарегистрированы?
            <Link to="/signup" className="form__link">
              Регистрация
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;

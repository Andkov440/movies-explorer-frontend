import React, {useState} from "react";
import headerLogo from "../../images/header_logo.svg";
import { Link } from "react-router-dom";
import isEmail from 'validator/es/lib/isEmail';
import '../Form/Form.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleLoginChange(e) {
    }

    function handleLoginPassword(e) {
    }

    function handleSubmit(e) {

    }

    return (
        <section className="form">
            <div className="form__container">
                <Link to="/" className="form__link">
                    <img className="form__logo" src={headerLogo} alt="логотип"></img>
                </Link>
                <h2 className="form__title">Рады видеть!</h2>
                <form className="form__content"
                      onSubmit={handleSubmit}
                      name='form-login'>
                    <div className="form__inputs">
                        <label className="form__item">
                            <p className="form__label">E-mail</p>
                            <input className="form__input"
                                   type="email"
                                   placeholder="pochta@yandex.ru"
                                   required
                                   onChange={handleLoginChange}
                            />
                            <p className={`form__error ${errors.email ? 'form__error-display' : ''}`}>{errors.email}</p>
                        </label>
                        <label className="form__item">
                            <p className="form__label">Пароль</p>
                            <input className="form__input"
                                   type="password"
                                   placeholder="pochta@yandex.ru"
                                   required
                                   onChange={handleLoginPassword}
                            />
                            <p className={`form__error ${errors.password ? 'form__error-display' : ''}`}>{errors.password}</p>
                        </label>
                    </div>
                    <button className={`form__button ${isValid ? "" : "form__button_disabled"}`}
                            type="submit"
                            disabled={!isValid ? true : ''}>Войти
                    </button>
                    <p className="form__text"> Ещё не зарегистрированы?
                        <Link to="/signup" className="form__link">Регистрация</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Login;

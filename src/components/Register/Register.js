import React, {useState} from "react";
import {Link} from "react-router-dom";
import '../Form/Form.css'

import headerLogo from '../../images/header_logo.svg';

function Register({onRegister}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = useState({});
    let isValid = true;

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
                <h2 className="form__title">Добро пожаловать!</h2>
                <form className="form__content"
                      onSubmit={handleSubmit}
                      name='form-login'>
                    <div className="form__inputs">

                        <label className="form__item">
                            <p className="form__label">Имя</p>
                            <input className="form__input"
                                   type="name"
                                   placeholder="Виталий"
                                // value={name}
                                   required
                                   onChange={handleLoginChange}
                            />
                        </label>
                        <label className="form__item">
                            <p className="form__label">E-mail</p>
                            <input className="form__input"
                                   type="email"
                                   placeholder="pochta@yandex.ru"
                                   //value={email}
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
                                   //value={password}
                                   required
                                    onChange={handleLoginPassword}
                            />
                            <p className={`form__error ${errors.password ? 'form__error-display' : ''}`}>{errors.password}</p>
                        </label>
                    </div>
                    <button className={`form__button ${isValid ? "" : "form__button_disabled"}`} type="submit"
                            disabled={!isValid ? true : ''}>Войти
                    </button>
                    <p className="form__text">Уже зарегистрированы?
                        <Link to="/signin" className="form__link">Войти</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}

export default Register;

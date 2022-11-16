import React, {useState} from "react";
import {Link} from "react-router-dom";
import '../Form/Form.css'

import headerLogo from '../../images/header_logo.svg';
import isEmail from 'validator/es/lib/isEmail';

function Register({onRegister}) {

    const [inputValues, setInputValues] = useState({});

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();
        onRegister( inputValues );
    }

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        if (name === 'email') {
            if (!isEmail(value)) {
                target.setCustomValidity('Некорректый адрес электронной почты');
            } else {
                target.setCustomValidity('');
            }
        }

        setInputValues({ ...inputValues, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest('form').checkValidity());
    };


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
                                   name="name"
                                   placeholder="Введите имя"
                                   value={inputValues.name || ''}
                                   required
                                   onChange={ handleInputChange }
                            />
                        </label>
                        <label className="form__item">
                            <p className="form__label">E-mail</p>
                            <input className="form__input"
                                   type="email"
                                   name="email"
                                   placeholder="pochta@yandex.ru"
                                   value={inputValues.email || ''}
                                   required
                                   onChange={ handleInputChange }
                            />
                            <p className={`form__error ${errors.email ? 'form__error-display' : ''}`}>{errors.email}</p>
                        </label>
                        <label className="form__item">
                            <p className="form__label">Пароль</p>
                            <input className="form__input"
                                   type="password"
                                   name="password"
                                   placeholder=""
                                   value={inputValues.password || ''}
                                   minLength="2"
                                   required
                                   onChange={handleInputChange }
                            />
                            <p className={`form__error ${errors.password ? 'form__error-display' : ''}`}>{errors.password}</p>
                        </label>
                    </div>
                    <button className={`form__button ${isValid ? "" : "form__button_disabled"}`} type="submit"
                            disabled={!isValid ? true : ''}>Зарегистрироваться
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

import React, {useState} from "react";
import './Profile.css'

function handleNameChange() {

}

function handleEmailChange() {

}

function onSignOut() {

}

function handleSubmit() {

}

function Profile({onProfile}) {

    let isVisibleButton;
    let email;
    return (
        <section className="profile">
            <form className="profile__form"
                  onSubmit={handleSubmit}>
                <h3 className="profile__title">Привет, Виталий!</h3>
                <div className="profile__inputs">
                    <p className="profile__text">Имя</p>
                    <div className="profile__area profile__area_name">
                        <input className="profile__settings"
                               nChange={handleNameChange}/>
                    </div>
                    <div className="profile__area profile__area_email">
                        <input className="profile__settings"
                               value={email}
                               placeholder="pochta@yandex.ru"
                               onChange={handleEmailChange}/>
                    </div>
                    <p className="profile__text">E-mail</p>
                </div>
                <button className="profile__button">Редактировать</button>
                <button className="profile__link"
                        type="button"
                        onClick={onSignOut}>Выйти из аккаунта
                </button>
            </form>
        </section>
    );
}

export default Profile;

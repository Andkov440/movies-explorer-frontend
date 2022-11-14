import React, { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from "react-router-dom";

function MoviesCard({ film, savedMoviesToggle, filmsSaved }) {
    const { pathname } = useLocation();
    const [favorite, setFavorite] = useState(false);

    return (
        <li className="card">
            <div className="card__content">
                <div className="card__text">
                    <h2 className="card__title">{ film.title }</h2>
                    <p className="card__duration"> {film.duration }</p>
                </div>
                {pathname === '/saved-movies' ? (
                    <button type="button" className="card__button card__button_delete" />
                ) : (
                    // <button type="button" className={`card__button card__button${favorite ? '_active' : '_inactive'}`} />
                    <button type="button" className={`card__button card__button_active`} />
                )}
            </div>
                <img className="card__image" src={`${film.image}`} alt={film.title}></img>
        </li>
    );
}

export default MoviesCard;

import React, {useEffect, useState} from 'react';
import './MoviesCard.css';
import {useLocation} from "react-router-dom";

function MoviesCard({film, onBookmarkClick, filmsSaved}) {
    const {pathname} = useLocation();
    const [isAdded, setIsAdded] = useState(false);

    function calcDurationMins(mins) {
        return `${Math.floor(mins / 60)} ч ${mins % 60} м`;
    }

    function handleBookmarkClick() {
        const newFavorite = !isAdded;
        const savedFilmArr = filmsSaved.filter((obj) => {
            return obj.movieId == film.id;
        });
        onBookmarkClick({...film, _id: savedFilmArr.length > 0 ? savedFilmArr[0]._id : null}, newFavorite);
    }

    const removeHandler = () => {
        onBookmarkClick(film, false);
    };

    useEffect(() => {
        if (pathname !== '/saved-movies') {
            const savedFilm = filmsSaved.filter((obj) => {
                return obj.movieId == film.id;
            });

            if (savedFilm.length > 0) {
                setIsAdded(true);
            } else {
                setIsAdded(false);
            }
        }
    }, [pathname, filmsSaved, film.id]);

    return (
        <li className="card">
            <div className="card__content">
                <div className="card__text">
                    <h2 className="card__title">{film.nameRU}</h2>
                    <p className="card__duration"> {calcDurationMins(film.duration)}</p>
                </div>
                {pathname === '/saved-movies' ? (
                    <button type="button"
                            className="card__button card__button_delete"
                            onClick={removeHandler}
                    />
                ) : (
                    <button type="button"
                            className={`card__button card__button${isAdded ? '_active' : '_inactive'}`}
                            onClick={handleBookmarkClick}/>
                )}
            </div>
            <a className="" href={pathname === '/saved-movies' ? film.trailerLink : film.trailer} target="_blank"
               rel="noreferrer">
                <img className="card__image"
                     src={pathname === '/saved-movies' ? `${film.image}` : `https://api.nomoreparties.co${film.image.url}`}
                     alt={film.nameRU}></img>
            </a>
        </li>
    );
}

export default MoviesCard;

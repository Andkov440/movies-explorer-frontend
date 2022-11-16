import React, {useEffect, useState} from 'react';
import './MoviesCardList.css';
import {useLocation} from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import {MOBILE_WIDTH, TABLET_WIDTH, DESKTOP_WIDTH } from "../../utils/constants"

function MoviesCardList({films, onBookmarkClick, filmsSaved, isMovieAdded}) {

    const {pathname} = useLocation();

    const [currentCount, setCurrentCount] = useState(0);
    const [extraRow, setExtraRow] = useState(3);
    const [filmsSplice, setFilmsSplice] = useState([]);


    const getCount = (windowSize) => {
        if (windowSize >= DESKTOP_WIDTH) {
            return {first: 12, extra: 3};
        }
        if (windowSize > MOBILE_WIDTH && windowSize <= TABLET_WIDTH) {
            return {first: 8, extra: 2};
        }
        return {first: 5, extra: 1};
    };

    const renderExtraRow = () => {
        const count = Math.min(films.length, currentCount + extraRow);
        const extraMovies = films.slice(currentCount, count);
        setFilmsSplice([...filmsSplice, ...extraMovies]);
        setCurrentCount(count);
    };

    const resizeHandler = () => {
        const windowSize = window.innerWidth;
        setExtraRow(getCount(windowSize));
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    useEffect(() => {
        const windowSize = window.innerWidth;
        setExtraRow(getCount(windowSize).extra);
        const count = Math.min(films.length, getCount(windowSize).first);
        setFilmsSplice(films.slice(0, count));
        setCurrentCount(count);
    }, [films]);

    const renderMore = () => renderExtraRow();

    return (
        <section className="cards">

            {!(films == null) ? (
                (films.length > 0) ? (
                pathname !== '/saved-movies' && (
                    (<ul className="cards__list">
                        {filmsSplice.map((film) => (
                            <MoviesCard
                                key={film.id || film.movieId}
                                film={film}
                                onBookmarkClick={onBookmarkClick}
                                filmsSaved={filmsSaved}
                                isMovieAdded={isMovieAdded}
                            />
                        ))}
                    </ul>))
                ) : '') : ''}
            {!(films == null) ? (
                (films.length > 0) ? (
                    pathname == '/saved-movies' && (
                        (<ul className="cards__list">
                            {films.map((film) => (
                                <MoviesCard
                                    key={film.id || film.movieId}
                                    film={film}
                                    onBookmarkClick={onBookmarkClick}
                                    filmsSaved={filmsSaved}
                                    isMovieAdded={isMovieAdded}
                                />
                            ))}
                        </ul>))
                ) : '') : ''}
            {!(films == null) ? (
                films.length > 0 && pathname !== '/saved-movies' && (
                    <div className="cards__button-container">
                        {currentCount < films.length && <button className="cards__button" type="button" name="more" onClick={renderMore}>Ещё</button>}
                    </div>
                )) : ''}

        </section>
    );
}


export default MoviesCardList;

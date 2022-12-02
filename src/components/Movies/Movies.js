import React, { useContext, useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

function Movies({ openPopup, isLoading }) {
  const DURATION = 40;
  const [films, setFilms] = useState(null);
  const [filmsInputSearch, setFilmsInputSearch] = useState("");
  const [filmsSaved, setFilmsSaved] = useState([]);

  const [preloader, setPreloader] = useState(false);
  const [error, setError] = useState(false);

  const [filmsSwitch, setFilmsSwitch] = useState(true);

  const [bookmarkClick, setBookmarkClick] = useState(false);

  const filterShortFilm = (moviesToFilter) =>
    moviesToFilter.filter((item) => item.duration <= DURATION);

  useEffect(() => {
    const checkbox = localStorage.getItem("filmsSwitch");
    setFilmsSwitch(checkbox === "true");

    const localStorageFilmsInputSearch =
      localStorage.getItem("filmsInputSearch");

    const localStorageFilmsSaved = localStorage.getItem("filmsSaved");

    if (localStorageFilmsSaved) {
      setFilmsSaved(JSON.parse(localStorageFilmsSaved));
    }

    const localStorageFilms = localStorage.getItem("films");
    const localStorageFilmsFilter = localStorage.getItem("filmsFilter");

    if (localStorageFilms) {
      const filterData = JSON.parse(localStorageFilmsFilter);
      setFilms(filterData);
      setPreloader(false);
    }

    if (localStorageFilmsInputSearch) {
      setFilmsInputSearch(localStorageFilmsInputSearch);
    }
  }, [openPopup]);

  useEffect(() => {
    const checkbox = localStorage.getItem("filmsSwitch");
    setFilmsSwitch(checkbox === "false");
  }, [filmsSwitch]);

  useEffect(() => {
    const localStorageFilmsSaved = localStorage.getItem("filmsSaved");

    if (localStorageFilmsSaved) {
      setFilmsSaved(JSON.parse(localStorageFilmsSaved));
    }

    if (localStorageFilmsSaved === null)
      mainApi
        .getMovies()
        .then((data) => {
          setFilmsSaved(data);
          localStorage.setItem("filmsSaved", JSON.stringify(data));
        })
        .catch((err) => {
          openPopup({ err }, false);
        });
  }, [bookmarkClick]);

  async function handleGetFilmsSwitch() {
    setFilmsSwitch(!filmsSwitch);
    localStorage.setItem("filmsSwitch", filmsSwitch);
  }

  async function onBookmarkClick(film, isAdded) {
    if (isAdded) {
      let jsonFilm = {
        image: "https://api.nomoreparties.co" + film.image.url,
        trailerLink: film.trailerLink,
        thumbnail: "https://api.nomoreparties.co" + film.image.url,
        movieId: film.id,
        country: film.country || "Неизвестно",
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
      };
      try {
        await mainApi.addMovies(jsonFilm).then((result) => {
          setFilmsSaved([filmsSaved.push(result)]);
          localStorage.setItem("filmsSaved", JSON.stringify(filmsSaved));
          setBookmarkClick(!bookmarkClick);
        });
      } catch {
        openPopup(`Ошибка добавления фильма!`, false);
      }
    } else {
      try {
        await mainApi.deleteMovies(film._id);
        let temp = filmsSaved.filter((obj) => obj._id != film._id);
        setFilmsSaved(temp);
        localStorage.setItem("filmsSaved", JSON.stringify(temp));
      } catch (err) {
        openPopup(`Ошибка удаления фильма!`, false);
      }
    }
  }

  async function handleGetMovies(filmsInputSearch) {
    if (!filmsInputSearch) {
      openPopup("Введите ключевое слово и повторите  поиск!", false);
      setError(true);
      return false;
    }

    setError(false);
    setPreloader(true);

    try {
      const localStorageFilms = localStorage.getItem("films");
      const localStorageFilmsFilter = localStorage.getItem("filmsFilter");
      let filmsFilter = [];

      if (localStorageFilms === null) {
        const filmsArray = await moviesApi.getMovies();
        localStorage.setItem("films", JSON.stringify(filmsArray)); // найденные фильмы

        filmsFilter = filmsArray.filter(({ nameRU }) =>
          nameRU.toLowerCase().includes(filmsInputSearch.toLowerCase())
        );

        localStorage.setItem("filmsFilter", JSON.stringify(filmsFilter)); // найденные фильмы
      } else {
        filmsFilter = JSON.parse(localStorageFilms).filter(({ nameRU }) =>
          nameRU.toLowerCase().includes(filmsInputSearch.toLowerCase())
        );

        localStorage.setItem("filmsFilter", JSON.stringify(filmsFilter)); // найденные фильмы
      }

      if (filmsFilter.length > 0) {
        if (filmsSwitch) {
          openPopup("Найдено фильмов: " + filmsFilter.length, true);
        }

        if (!filmsSwitch) {
          openPopup(
            "Найдено фильмов: " + filterShortFilm(filmsFilter).length,
            true
          );
        }
      } else {
        openPopup("Ничего не найдено", false);
      }

      //текст запроса, найденные фильмы и состояние переключателя короткометражек сохраняются в хранилище
      localStorage.setItem("filmsFilter", JSON.stringify(filmsFilter)); // найденные фильмы
      localStorage.setItem("filmsInputSearch", filmsInputSearch); //текст запроса,
      localStorage.setItem("filmsSwitch", filmsSwitch); //переключатель,
    } catch (err) {
      openPopup(
        `Во время запроса произошла ошибка.       Попробуйте позже.`,
        false
      );
      setFilms([]);
      setError(true);
      localStorage.removeItem("films");
      localStorage.removeItem("filmsFilter");
      localStorage.removeItem("filmsInputSearch");
      localStorage.removeItem("filmsSwitch");
    } finally {
      setPreloader(false);
    }
  }

  return (
    <section>
      <SearchForm
        handleGetMovies={handleGetMovies}
        filmsInputSearch={filmsInputSearch}
        handleGetFilmsSwitch={handleGetFilmsSwitch}
        filmsSwitch={filmsSwitch}
      />

      {preloader && <Preloader />}

      {!preloader && !error && films !== null && filmsSaved !== null && (
        <MoviesCardList
          films={filmsSwitch ? films : filterShortFilm(films)}
          onBookmarkClick={onBookmarkClick}
          filmsSaved={filmsSaved}
        />
      )}
    </section>
  );
}

export default Movies;

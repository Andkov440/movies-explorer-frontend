import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

function SavedMovies({ openPopup }) {
  const [filmsArr, setFilmsArr] = useState([]);
  const [filmsInputSearch, setFilmsInputSearch] = useState("");

  const [preloader, setPreloader] = useState(false);
  const [error, setError] = useState(false);

  const [filmsSwitch, setFilmsSwitch] = useState(true);

  const [deleteClick] = useState(true);

  const filterShortFilm = (moviesToFilter) =>
    moviesToFilter.filter((item) => item.duration <= 40);

  async function onBookmarkClick(film, isAdded) {
    if (!isAdded) {
      try {
        await mainApi.deleteMovies(film._id);
        debugger;

        let temp = filmsArr.filter((obj) => obj._id != film._id);
        setFilmsArr(temp);
        localStorage.setItem("filmsSaved", JSON.stringify(temp));
      } catch (err) {
        openPopup(`Ошибка!`, false);
      }
    }
  }

  useEffect(() => {
    const localStorageFilmsSaved = localStorage.getItem("filmsSaved");

    if (localStorageFilmsSaved) {
      setFilmsArr(JSON.parse(localStorageFilmsSaved));
    }
  }, [deleteClick]);

  async function handleGetFilmsSwitch() {
    setFilmsSwitch(!filmsSwitch);
  }

  async function handleGetMovies(filmsInputSearch) {
    if (!filmsInputSearch) {
      openPopup("Введите ключевое слово и повторите  поиск!", false);
      return false;
    }

    setError(false);
    setPreloader(true);

    try {
      const filmsArray = filmsArr;
      let filmsFilter = filmsArray.filter(({ nameRU }) =>
        nameRU.toLowerCase().includes(filmsInputSearch.toLowerCase())
      );

      if (filmsFilter.length > 0) {
        if (filmsSwitch) {
          openPopup("Найдено фильмов: " + filmsFilter.length, true);
          setFilmsArr(filmsFilter);
        }

        if (!filmsSwitch) {
          openPopup(
            "Найдено фильмов: " + filterShortFilm(filmsFilter).length,
            true
          );
          setFilmsArr(filmsFilter);
        }
      } else {
        openPopup("Ничего не найдено", false);
        setFilmsArr(filmsArr);
      }
    } catch (err) {
      openPopup(
        `Во время запроса произошла ошибка.`,
        false
      );
      setFilmsArr([]);
      setError(true);
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
      {!preloader && !error && (
        <MoviesCardList
          films={filmsSwitch ? filmsArr : filterShortFilm(filmsArr)}
          onBookmarkClick={onBookmarkClick}
          filmsSaved={filmsArr}
        />
      )}
    </section>
  );
}

export default SavedMovies;

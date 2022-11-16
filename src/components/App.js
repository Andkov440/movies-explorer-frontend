import "../../src/components/Page/Page.css";

import React, { useCallback, useEffect, useState } from "react";
import Redirect from "react-router-dom/es/Redirect";
import { useLocation } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import Movies from "./Movies/Movies";
import Preloader from "./Preloader/Preloader";
import PageNotFound from "./PageNotFound/PageNotFound";
import Main from "./Main/Main";

import success from "../images/success.svg";
import fail from "../images/fail.svg";

import MainApi, { getContent } from "../utils/MainApi";

import InfoTooltip from "./InfoTooltip/InfoTooltip";
import mainApi from "../utils/MainApi";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import SavedMovies from "./SavedMovies/SavedMovies";

function App() {
  const Route = require("react-router-dom").Route;
  const Switch = require("react-router-dom").Switch;

  const [showItems, setShowItems] = useState(false);
  const handleToggleMenu = () => setShowItems(!showItems);
  const { pathname } = useLocation();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupImage, setPopupImage] = React.useState("");

  const [currentUser, setCurrentUser] = useState({});

  const jwt = localStorage.getItem("jwt");

  const [isLoading, setIsLoading] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;

    const tokenCheck = (jwt) => {
      mainApi
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
            history.push(path);
          } else {
            setLoggedIn(false);
            localStorage.removeItem("films");
            localStorage.removeItem("filmsFilter");
            localStorage.removeItem("filmsInputSearch");
            localStorage.removeItem("filmsSwitch");
            localStorage.removeItem("filmsSaved");
            localStorage.clear();
            setCurrentUser(null);
          }
        })
        .catch((err) => {});
    };

    if (jwt) {
      tokenCheck(jwt);
    }
  }, [jwt]);

  function onRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          setIsOpenPopup(true);
          setPopupImage(success);
          setPopupTitle("Вы успешно зарегистрировались");

          onLogin(name, email);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsOpenPopup(true);
        setPopupImage(fail);
        setPopupTitle("Ошибка регистрации!");
      });
  }

  function onLogin(email, password) {
    MainApi.authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          setIsOpenPopup(true);
          setPopupImage(success);
          setPopupTitle("Вы успешно авторизовались!");
          setLoggedIn(true);
          MainApi.updateToken();
          history.push("/movies");
        }
      })
      .catch((err) => {
        setIsOpenPopup(true);
        setPopupImage(fail);
        setPopupTitle("Ошибка авторизации!" + err);
      });
  }

  const onLoggedOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");

    localStorage.removeItem("films");
    localStorage.removeItem("filmsFilter");
    localStorage.removeItem("filmsInputSearch");
    localStorage.removeItem("filmsSwitch");
    localStorage.removeItem("filmsSaved");

    localStorage.clear();
    history.push("/");
    setCurrentUser(null);
  };

  function openPopup(textError, status) {
    setPopupTitle(textError);
    setIsOpenPopup(true);

    if (status) {
      setPopupImage(success);
    } else setPopupImage(fail);
  }

  function closePopup() {
    setIsOpenPopup(false);
    setPopupTitle("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`page ${showItems ? "page_background-black" : ""}`}>
        <div className="page__content">
          {pathname === "/movies" ||
          pathname === "/saved-movies" ||
          pathname === "/profile" ||
          pathname === "/landing" ||
          pathname === "/" ? (
            <Header
              authOn={loggedIn}
              showItems={showItems}
              handleToggleMenu={handleToggleMenu}
            />
          ) : (
            ""
          )}

          <main>
            <Switch>
              <Route exact path="/">
                <Main />
              </Route>
              <Route path="/signin">
                {() =>
                  !loggedIn ? (
                    <Login onLogin={onLogin} />
                  ) : (
                    <Redirect to="/movies" />
                  )
                }
              </Route>
              <Route path="/signup">
                {() =>
                  !loggedIn ? (
                    <Register onRegister={onRegister} />
                  ) : (
                    <Redirect to="/movies" />
                  )
                }
              </Route>
              <ProtectedRoute
                path="/profile"
                loggedIn={loggedIn}
                onLoggedOut={onLoggedOut}
                component={Profile}
                openPopup={openPopup}
              />
              <ProtectedRoute
                path="/movies"
                loggedIn={loggedIn}
                component={Movies}
                openPopup={openPopup}
                isLoading={isLoading}
              />
              <ProtectedRoute
                path="/saved-movies"
                loggedIn={loggedIn}
                component={SavedMovies}
                openPopup={openPopup}
                isLoading={isLoading}
              />
              <Route path="/landing">
                <Main />
              </Route>
              <Route path="*">
                {" "}
                <PageNotFound />
              </Route>
            </Switch>
          </main>

          {pathname === "/movies" ||
          pathname === "/saved-movies" ||
          pathname === "/landing" ? (
            <Footer />
          ) : (
            ""
          )}
          <InfoTooltip
            text={popupTitle}
            image={popupImage}
            isOpen={isOpenPopup}
            onClose={closePopup}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

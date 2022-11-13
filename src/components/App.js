import '../../src/components/Page/Page.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import React, {useState} from "react";

import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

import Register from "./Register/Register";
import Login from './Login/Login'
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import Redirect from "react-router-dom/es/Redirect";
import Profile from "./Profile/Profile";
import Movies from "./Movies/Movies";
import Preloader from "./Preloader/Preloader";
import PageNotFound from "./PageNotFound/PageNotFound";
import {useLocation} from "react-router-dom";
import Main from "./Main/Main";


function App() {

    const [showItems, setShowItems] = useState(false);
    const handleToggleMenu = () => setShowItems(!showItems);
    const {pathname} = useLocation();
    let loggedIn = false;
    return (
        <div className={`page ${showItems ? 'page_background-black' : ''}`}>
            <div className="page__content">
                {pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' || pathname === '/landing' ?
                    <Header
                        authOn={pathname === '/landing' ? false : true} //
                        showItems={showItems}
                        handleToggleMenu={handleToggleMenu}
                    /> : ''}

                <main>
                    <Switch>
                        <Route path="/signin"><Login/></Route>

                        <Route path="/signup"><Register/></Route>

                        <Route path="/profile"><Profile/></Route>

                        <Route path="/movies"><Movies/></Route>

                        <Route path="/saved-movies"><Movies/></Route>

                        <Route path="/landing"><Main/></Route>

                        <Route exact path="*">
                            {loggedIn ? <Redirect to="/"/> : <Redirect to="/landing"/>}
                        </Route>

                        <Route path="/not-found"><PageNotFound/></Route>
                    </Switch>
                </main>

                {pathname === '/movies' || pathname === '/saved-movies' || pathname === '/landing' ?
                    < Footer/> : ''}
            </div>
        </div>
    );
}

export default App;

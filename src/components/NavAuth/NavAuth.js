import {Link} from 'react-router-dom';
import headerLogo from '../../images/header_logo.svg';


function NavAuth(props) {
    return <nav className={`header__body-auth-off ${props.authOn ? "" : "header__body-auth-off_active"}`}>
        <Link to="/landing" className="header__link">
            <img className="header__logo header__logo_auth-off" src={headerLogo} alt="логотип"/>
        </Link>
        <ul className="header__container header__container_auth-off">
            <li className="">
                <Link to="/signup" className="header__link header__link_auth-off">Регистрация</Link>
            </li>
            <li className="">
                <button className="header__login-button" type="button" onClick={props.onClick}>
                    <Link to="/signin" className="header__profile-link header__profile-link_black">Войти</Link>
                </button>
            </li>
        </ul>
    </nav>;
}

export default NavAuth;

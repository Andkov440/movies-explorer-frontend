import './SearchForm.css';
import React, {useEffect, useState} from 'react';
import searchIcon from "../../images/icon2.svg";

const SearchForm = ({handleGetMovies, filmsInputSearch, handleGetFilmsSwitch, filmsSwitch }) => {

    const [inputSearch, setInputSearch] = useState('');
    const [switchSearch, setSwitchSearch] = useState(false);

    function handleInputChange(e) {
        setInputSearch(e.target.value);
    }

    function handleSwitchChange(e) {
        setSwitchSearch(!switchSearch);
        handleGetFilmsSwitch(switchSearch);
    }

    function handleSubmit(e) {
        e.preventDefault();

        handleGetMovies(inputSearch);
    }

    useEffect(() => {
        setInputSearch(filmsInputSearch);
        setSwitchSearch(filmsSwitch);

    }, [filmsInputSearch, filmsSwitch]);


    return (
        <section className="movies">
            <form className="search">
                <div className="search__content">
                    <div className="search__string-content">
                        <img className="search__ico" src={searchIcon}  alt="логотип"></img>
                        <input className="search__input"
                               placeholder="Фильм"
                               type="text"
                               value={inputSearch || ''}
                               onChange={handleInputChange}
                               required />
                        <button type="submit" className="search__button" onClick={handleSubmit}></button>
                    </div>
                    <div className="search__toggle">
                        <label className="search__tumbler">
                            <input className="search__checkbox" type="checkbox" onChange={handleSwitchChange} value={switchSearch}  checked={switchSearch} />
                            <span className={`search__slider search__slider${!switchSearch ? '_active' : '_inactive'}`}/>
                        </label>
                        <p className="search__films">Короткометражки</p>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default SearchForm;

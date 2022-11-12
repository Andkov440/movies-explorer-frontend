import './SearchForm.css';
import React, {useEffect, useState} from 'react';
import searchIco from "../../images/icon__CCOLOR_icon-2.svg";

const SearchForm = () => {

    const [switchSearch, setSwitchSearch] = useState(false);
    const [inputSearch, setInputSearch] = useState('');

    function handleInputChange(e) {

    }

    function handleSwitchChange(e) {
        const newSwitchSearch = !switchSearch;
    }

    function handleSubmit(e) {

    }

    return (
        <section className="movies">
            <form className="search">
                <div className="search__content">
                    <div className="search__string-content">
                        <img className="search__ico" src={searchIco}  alt="логотип"></img>
                        <input className="search__input" placeholder="Фильм" type="text" value={inputSearch || ''} onChange={handleInputChange} required />
                        <button type="submit" className="search__button" onClick={handleSubmit}></button>
                    </div>
                    <div className="search__toggle">
                        <label className="search__tumbler">
                            <input className="search__checkbox" type="checkbox" onChange={handleSwitchChange} />
                            <span className="search__slider" />
                        </label>
                        <p className="search__films">Короткометражки</p>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default SearchForm;

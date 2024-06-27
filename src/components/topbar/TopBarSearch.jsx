import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

export default function TopBarSearch() {
    const [searchWord, setSearchWord] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchWord(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/searchList/${searchWord}`);
    };

    return (
        <form className="searchContainer" onSubmit={handleSearchSubmit}>
            <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                className="searchInput" 
                onChange={handleSearchChange}
                value={searchWord}
            />
            <button className="searchButton" type="button" onClick={handleSearchSubmit}>
                <SearchIcon />
            </button>
        </form>
    );
}

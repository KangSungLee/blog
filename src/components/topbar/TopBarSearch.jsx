import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function TopBarSearch() {
    const [searchWord, setSearchWord] = useState('');

    const handleSearchChange = (e) => {
        setSearchWord(e.target.value);
    };

    return (
        <div className="searchContainer">
            <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                className="searchInput" 
                onChange={handleSearchChange}
                value={searchWord}
            />
            <button className="searchButton">
                <SearchIcon />
            </button>
        </div>
    );
}

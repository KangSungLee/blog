import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

export default function TopBarSearch() {
    const [searchWord, setSearchWord] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchWord(e.target.value);
    };

    const searchClick = () => {
        navigate(`/searchList/${searchWord}`)
    }

    return (
        <div className="searchContainer">
            <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                className="searchInput" 
                onChange={handleSearchChange}
                value={searchWord}
            />
            <button className="searchButton" onClick={() => searchClick()}>
                <SearchIcon />
            </button>
        </div>
    );
}

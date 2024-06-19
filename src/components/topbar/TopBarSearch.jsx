import React from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function TopBarSearch() {

    return (
        <div className="searchContainer">
            <input type="text" placeholder="검색어를 입력하세요" className="searchInput" />
            <button className="searchButton">
                <SearchIcon />
            </button>
        </div>
    );
}

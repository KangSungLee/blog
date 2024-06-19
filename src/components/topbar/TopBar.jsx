import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import "../../css/topBar.css";
import { useLocation } from "react-router-dom";

export default function TopBar() {
    const location = useLocation();

    return (
        <div className="topBar">
            <div className="urlDisplay">
                {location.pathname}
            </div>
            <div className="searchContainer">
                <input type="text" placeholder="검색어를 입력하세요" className="searchInput" />
                <button className="searchButton">
                    <SearchIcon />
                </button>
            </div>
        </div>
    );
}

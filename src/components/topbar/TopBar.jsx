import React from "react";
import TopBarSearch from "./TopBarSearch";
import TopBarUrlDisplay from "./TopBarUrlDisplay";
import "../../css/topBar.css";

export default function TopBar() {

    return (
        <div className="topBar">
            <TopBarUrlDisplay />
            <TopBarSearch />
        </div>
    );
}

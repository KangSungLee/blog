import React from "react";
import { useLocation } from "react-router-dom";

export default function TopBarUrlDisplay() {
    const location = useLocation();

    return (
        <div className="urlDisplay">
            {location.pathname}
        </div>
    );
}

import React, { useState } from "react";

const pagesContext = require.context('../components/implementationPages', false, /\.jsx$/);
const pages = pagesContext.keys().map(key => ({
    path: key.replace('./', '/implementationPage/').replace('.jsx', ''),
    title: key.replace('./', '').replace('.jsx', '').replace(/([A-Z])/g, ' $1').trim(),
    component: pagesContext(key).default
}));

const ImplementationList = () => {
    const [selectedPage, setSelectedPage] = useState(null);

    const handlePageClick = (page) => {
        if (selectedPage === page) {
            setSelectedPage(null);
        } else {
            setSelectedPage(page); 
        }
    };

    return (
        <div>
            <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
                {pages.map(page => (
                    <li key={page.path} style={{ marginRight: 10 }}>
                        <button onClick={() => handlePageClick(page)}>{page.title}</button>
                    </li>
                ))}
            </ul>
            <hr />
            {selectedPage && (
                <div>
                    <h3>{selectedPage.title}</h3>
                    <selectedPage.component />
                </div>
            )}
        </div>
    );
};

export default ImplementationList;

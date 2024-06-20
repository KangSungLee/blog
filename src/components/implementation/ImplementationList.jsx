import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const pagesContext = require.context('../../pages/implementationPages', false, /\.jsx$/);
const pages = pagesContext.keys().map(key => ({
    path: key.replace('./', '/implementationPage/').replace('.jsx', ''),
    title: key.replace('./', '').replace('.jsx', '').replace(/([A-Z])/g, ' $1').trim(),
    component: pagesContext(key).default
}));

const ITEMS_PER_PAGE = 5;

const ImplementationList = () => {
    const [currentPage, setCurrentPage] = useState(1);  
    const totalPages = Math.ceil(pages.length / ITEMS_PER_PAGE);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedPages = pages.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {selectedPages.map(page => (
                <Box key={page.path} marginBottom={2} border="1px solid #ddd" padding={2} width="50%">
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6">{page.title}</Typography>
                    </Link>
                </Box>
            ))}
            <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                variant="outlined" 
                shape="rounded" 
                sx={{ marginTop: 2, margin: 'auto' }}
            />
        </Box>
    );
};

export default ImplementationList;  
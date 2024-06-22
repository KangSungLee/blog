import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import pagesData from './pagesData'; 

const ITEMS_PER_PAGE = 5;

const ImplementationList = () => {
    const [currentPage, setCurrentPage] = useState(1);  
    const totalPages = Math.ceil(pagesData.length / ITEMS_PER_PAGE);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedPages = pagesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
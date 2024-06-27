import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, Box, Typography, Paper } from '@mui/material';
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
        <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Implementation List
            </Typography>
            {selectedPages.map(page => (
                <Paper key={page.path} sx={{ mb: 2, p: 2 }}>
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6">
                            {page.title}
                        </Typography>
                    </Link>
                </Paper>
            ))}
            <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                variant="outlined" 
                shape="rounded" 
                color="primary"
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
        </Box>
    );
};

export default ImplementationList;

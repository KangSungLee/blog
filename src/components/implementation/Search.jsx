import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ref, onValue } from 'firebase/database';
import { database } from '../../api/firebase';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import pagesData from "./pagesData";

const ITEMS_PER_PAGE = 5;

const Search = () => {
    const { searchWord } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredPages, setFilteredPages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setSearchTerm(searchWord);
        setCurrentPage(1);
    }, [searchWord]);

    useEffect(() => {
        const recordsRef = ref(database, 'records');
        setLoading(true);

        console.log("Loading pagesData:", pagesData); // Add this log

        const unsubscribe = onValue(recordsRef, (snapshot) => {
            const data = snapshot.val();
            const recordsArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];

            console.log("Firebase data:", recordsArray); // Add this log

            const newFilteredPages = [
                ...pagesData,
                ...recordsArray
            ].filter(page =>
                page.title.toLowerCase().includes(searchTerm.toLowerCase()) 
                || page.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPages(newFilteredPages);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [searchTerm]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const selectedPages = filteredPages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalFilteredPages = Math.ceil(filteredPages.length / ITEMS_PER_PAGE);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    {selectedPages.length === 0 ? (
                        <Typography variant="h6">검색 결과가 없습니다.</Typography>
                    ) : (
                        selectedPages.map(page => (
                            <Box key={page.id || page.path} marginBottom={2} border="1px solid #ddd" padding={2} width="50%">
                                <Link to={page.path || `/record/${page.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="h6">{page.title}</Typography>
                                </Link>
                            </Box>
                        ))
                    )}
                    {selectedPages.length > 0 && (
                        <Pagination 
                            count={totalFilteredPages} 
                            page={currentPage} 
                            onChange={handlePageChange} 
                            variant="outlined" 
                            shape="rounded" 
                            sx={{ marginTop: 2, margin: 'auto' }}
                        />
                    )}
                </>
            )}
        </Box>
    );
};

export default Search;

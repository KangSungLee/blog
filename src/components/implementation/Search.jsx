import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ref, onValue } from 'firebase/database';
import { database } from '../../api/firebase';
import { Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

        const unsubscribe = onValue(recordsRef, (snapshot) => {
            const data = snapshot.val();
            const recordsArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];

            const normalizedRecords = recordsArray.map(record => ({
                id: record.id,
                title: record.title.normalize('NFC'),
                content: record.content.normalize('NFC')
            }));

            const newFilteredPages = [
                ...pagesData.map(page => ({
                    ...page,
                    title: page.title.normalize('NFC'),
                    content: page.content.normalize('NFC')
                })),
                ...normalizedRecords
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
                        <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>순번</TableCell>
                                        <TableCell>제목</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedPages.map((page, index) => (
                                        <TableRow key={page.id || page.path}>
                                            <TableCell>{startIndex + index + 1}</TableCell>
                                            <TableCell>
                                                <Link to={page.path || `/record/${page.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    {page.title}
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                    {selectedPages.length > 0 && (
                        <Pagination 
                            count={totalFilteredPages} 
                            page={currentPage} 
                            onChange={handlePageChange} 
                            color="primary"
                            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
                        />
                    )}
                </>
            )}
        </Box>
    );
};

export default Search;

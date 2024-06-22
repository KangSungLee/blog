import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import pagesData from './pagesData'; 

const ImplementationPage = () => {
    const { pagePath } = useParams();
    const [page, setPage] = useState(null);

    useEffect(() => {
        const foundPage = pagesData.find(p => p.path === `/implementationPage/${pagePath}`);
        setPage(foundPage);
    }, [pagePath]);

    return (
        <Box>
            {page ? (
                <>
                    <Typography variant="h4" gutterBottom>{page.title}</Typography>
                    <page.component />
                </>
            ) : (
                <Typography variant="h6">페이지를 찾을 수 없습니다.</Typography>
            )}
        </Box>
    );
};

export default ImplementationPage;

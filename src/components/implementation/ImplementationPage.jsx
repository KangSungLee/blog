import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";

const ImplementationPage = () => {
    const { pagePath } = useParams();
    const [page, setPage] = useState(null);

    useEffect(() => {
        const pagesContext = require.context('../../pages/implementationPages', false, /\.jsx$/);
        const pages = pagesContext.keys().map(key => ({
            path: key.replace('./', '/implementationPage/').replace('.jsx', ''),
            title: key.replace('./', '').replace('.jsx', '').replace(/([A-Z])/g, ' $1').trim(),
            component: pagesContext(key).default
        }));

        const foundPage = pages.find(p => p.path === `/implementationPage/${pagePath}`);
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

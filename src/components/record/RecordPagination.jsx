import React from 'react';
import { Pagination } from '@mui/material';

const RecordPagination = ({ totalPages, currentPage, handleChangePage }) => {
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={handleChangePage}
      color="primary"
      sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
    />
  );
};

export default RecordPagination;

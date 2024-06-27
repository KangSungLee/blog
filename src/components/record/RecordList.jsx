import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../../api/firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import RecordTable from './RecordTable';
import RecordPagination from './RecordPagination';

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const recordsRef = ref(database, 'records');
    onValue(recordsRef, (snapshot) => {
      const data = snapshot.val();
      const recordsArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      recordsArray.sort((a, b) => b.createdAt - a.createdAt);
      setRecords(recordsArray);
    });
  }, []);

  const deleteRecord = (id) => {
    const recordRef = ref(database, `records/${id}`);
    remove(recordRef);
    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
  };

  const createRecord = () => {
    navigate('/recordCreate');
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Record List
      </Typography>
      <Button variant="contained" color="primary" onClick={createRecord} sx={{ mb: 2 }}>
        글 작성
      </Button>
      <RecordTable records={currentRecords} indexOfFirstRecord={indexOfFirstRecord} />
      <RecordPagination totalPages={totalPages} currentPage={currentPage} handleChangePage={handleChangePage} />
    </Box>
  );
};

export default RecordList;

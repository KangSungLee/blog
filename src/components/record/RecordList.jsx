import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../../api/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Box, Typography } from '@mui/material';

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
      // 최신순으로 정렬
      recordsArray.sort((a, b) => b.createdAt - a.createdAt);
      setRecords(recordsArray);
    });
  }, []);

  const createRecord = () => {
    navigate('/recordCreate');
  };

  const editRecord = (id) => {
    navigate(`/recordEdit/${id}`);
  };

  const deleteRecord = (id) => {
    const recordRef = ref(database, `records/${id}`);
    remove(recordRef);
    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>순번</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((record, index) => (
              <TableRow key={record.id}>
                <TableCell>{indexOfFirstRecord + index + 1}</TableCell>
                <TableCell>
                  <Link to={`/record/${record.id}`}>{record.title}</Link>
                </TableCell>
                <TableCell>{new Date(record.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => editRecord(record.id)} sx={{ mr: 1 }}>
                    수정
                  </Button>
                  <Button variant="contained" color="error" onClick={() => deleteRecord(record.id)}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        color="primary"
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default RecordList;

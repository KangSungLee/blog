import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const RecordTableRow = ({ record, index, indexOfFirstRecord, deleteRecord }) => {
    const navigate = useNavigate();
    
    const editRecord = (id) => {
        navigate(`/recordEdit/${id}`);
      };

  return (
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
  );
};

export default RecordTableRow;

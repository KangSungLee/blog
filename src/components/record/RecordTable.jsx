import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import RecordTableRow from './RecordTableRow';

const RecordTable = ({ records, indexOfFirstRecord, deleteRecord }) => {


  return (
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
          {records.map((record, index) => (
            <RecordTableRow
              key={record.id}
              record={record}
              index={index}
              indexOfFirstRecord={indexOfFirstRecord}
              deleteRecord={deleteRecord}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecordTable;

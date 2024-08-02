import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../api/firebase'; 
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

const RecordDetail = () => {
  const { recordId } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const recordRef = ref(database, `records/${recordId}`);
    onValue(recordRef, (snapshot) => {
      setRecord(snapshot.val());
    });
  }, [recordId]);

  return (
    <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
      {record ? (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            {record.title}
          </Typography>
          <Typography 
            variant="body1" 
            component="div"
            dangerouslySetInnerHTML={{ __html: record.content }}
          />
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default RecordDetail;

import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../../api/firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';

const CreateRecord = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const recordsRef = ref(database, 'records');
    const newRecordRef = push(recordsRef);
    set(newRecordRef, {
      title,
      content,
      createdAt: Date.now(),
    });

    setTitle('');
    setContent('');
    navigate('/recordList');
  };

  return (
    <Box 
      sx={{ 
        width: '50%', 
        margin: 'auto', 
        mt: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}
    >
      <Typography variant="h4" gutterBottom>
        글 작성
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="제목"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="내용"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          작성
        </Button>
      </form>
    </Box>
  );
};

export default CreateRecord;

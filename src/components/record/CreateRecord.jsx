import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../../api/firebase';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import swal from 'sweetalert';
import { uploadImage } from '../../api/cloudinary';


const CreateRecord = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';

    // Upload image if selected
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const recordsRef = ref(database, 'records');
    const newRecordRef = push(recordsRef);
    set(newRecordRef, {
      title,
      content,
      imageUrl, // Include the uploaded image URL in the record
      createdAt: Date.now(),
    }).then(() => {
      swal("작성되었습니다!", {
        icon: "success",
      });
    });

    setTitle('');
    setContent('');
    setImage(null);
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
        
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          style={{ marginBottom: '20px' }} 
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
              [{size: []}],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image', 'video'],
              ['clean']
            ],
          }}
          formats={[
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
          ]}
          style={{ height: '300px', marginBottom: '20px' }}
        />
        
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginTop: 10}}>
          작성
        </Button>
      </form>
    </Box>
  );
};

export default CreateRecord;

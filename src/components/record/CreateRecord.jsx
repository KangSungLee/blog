import React, { useState } from 'react';
import { ref, push, set } from 'firebase/database';
import { database } from '../../api/firebase';
import { useNavigate } from 'react-router-dom';

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
      createdAt: Date.now()
    });

    setTitle('');
    setContent('');
    navigate('/recordList')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">작성</button>
    </form>
  );
};

export default CreateRecord;

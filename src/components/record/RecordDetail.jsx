import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../api/firebase'; 
import { useParams } from 'react-router-dom';

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
    <div>
      {record ? (
        <>
          <h2>{record.title}</h2>
          <p>{record.content}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecordDetail;
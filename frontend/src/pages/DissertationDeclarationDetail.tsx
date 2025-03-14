import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../utils/api'

interface DissertationDeclaration {
  id: number;
  topic: string;
  description: string;
  submission_date: string;
  status: string;
  student_signature: string;
  supervisor_signature: string | null;
  approved_date: string | null;
  student: number;
  supervisor: number;
}

const DissertationDeclarationDetail: React.FC = () => {
  const { id } = useParams();
  const [declaration, setDeclaration] = useState<DissertationDeclaration | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeclarationDetails = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await apiClient.get(`dissertation_declarations/view/${id}/`, { 
              headers: { Authorization: `Bearer ${accessToken}` }
            });
            setDeclaration(response.data);
          } catch (error) {
        setError('Failed to fetch declaration details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeclarationDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      {declaration ? (
        <div style={{ padding: '20px', textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
          <h2>Dissertation Declaration Details</h2>
          <p><strong>ID:</strong> {declaration.id}</p>
          <p><strong>Topic:</strong> {declaration.topic}</p>
          <p><strong>Description:</strong> {declaration.description}</p>
          <p><strong>Student Signature:</strong> {declaration.student_signature}</p>
          <p><strong>Submission Date:</strong> {declaration.submission_date}</p>
          <p><strong>Status:</strong> {declaration.status}</p>
        </div>
      ) : (
        <p>No declaration found.</p>
      )}
    </div>
  );
};

export default DissertationDeclarationDetail;

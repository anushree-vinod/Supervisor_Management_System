import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchWithFallback } from '../hooks/useFetchWithFallback'; // Assuming you have this custom hook
import { dummyDissertationDeclarationDetail } from '../utils/staticdata'; // Import dummy data
import apiClient from '../utils/api';

interface DissertationDeclaration {
  id: number;
  topic: string;
  description: string;
  submission_date: string;
  status: string;
  student_signature: string;
}

const DissertationDeclarationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Memoize the fetch function to avoid unnecessary re-renders
  const fetchDeclarationDetails = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    const response = await apiClient.get(`dissertation_declarations/view/${id}/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data; // Return the single declaration object
  }, [id]);

  // Use the custom hook with fallback to dummy data
  const { data: declaration, loading } = useFetchWithFallback<DissertationDeclaration>(
    fetchDeclarationDetails,
    dummyDissertationDeclarationDetail // Fallback to dummy declaration data
  );

  const handleAction = async (status: string) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await apiClient.patch(`dissertation_declarations/${id}/approve/`, 
        { status: status.toLowerCase() }, 
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      alert(`Declaration ${status}`);
      navigate('/declarations'); // Redirect after action
    } catch (error) {
      alert(`Failed to ${status.toLowerCase()} declaration.`);
    }
  };

  if (loading) return <div>Loading...</div>;
  //if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px', textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
      {declaration ? (
        <>
          <h2>Dissertation Declaration Details</h2>
          <p><strong>ID:</strong> {declaration.id}</p>
          <p><strong>Topic:</strong> {declaration.topic}</p>
          <p><strong>Description:</strong> {declaration.description}</p>
          <p><strong>Student Signature:</strong> {declaration.student_signature}</p>
          <p><strong>Submission Date:</strong> {declaration.submission_date}</p>
          <p><strong>Status:</strong> {declaration.status}</p>

          {/* Show buttons only if status is pending */}
          {declaration.status.toLowerCase() === 'pending' && (
            <div style={{ marginTop: '20px' }}>
              <button
                onClick={() => handleAction('Approved')}
                style={{
                  marginRight: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Approve
              </button>
              <button
                onClick={() => handleAction('Rejected')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Reject
              </button>
            </div>
          )}
        </>
      ) : (
        <p>No declaration found.</p>
      )}
    </div>
  );
};

export default DissertationDeclarationDetail;

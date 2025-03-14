import React, { useEffect, useState } from 'react';
import apiClient from '../utils/api';
import { Link } from 'react-router-dom'; 

const DissertationDeclarationsList: React.FC = () => {
  const [declarations, setDeclarations] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeclarations = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await apiClient.get('dissertation_declarations/list/', { 
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setDeclarations(response.data);
      } catch (error) {
        setError('Failed to fetch projects.');
      }
    };

    fetchDeclarations();
  }, []);

  return (
    <div style={{ display: 'center',justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ width: '80%', maxWidth: '900px' }}>
        <h1 style={{ textAlign: 'center' }}>Dissertation Declarations</h1>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
          {declarations.length > 0 ? (
            declarations.map((declarations) => (
              <li key={declarations.id} style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
                {/* Making the topic clickable */}
                <h3>
                  <Link to={`/declarations/${declarations.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                    {declarations.topic}
                  </Link>
                </h3>  
                <p>{declarations.student_signature}</p>
                <p>{declarations.status}</p>
              </li>
            ))
          ) : (
            <p>No Declarations found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DissertationDeclarationsList;
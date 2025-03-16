import React, { useCallback } from 'react';
import { useFetchWithFallback } from '../hooks/useFetchWithFallback';
import { dummyDissertationDeclarations } from '../utils/staticdata';
import { Link } from 'react-router-dom';
import apiClient from '../utils/api';

// Define the interface for dissertation declarations data
interface DissertationDeclaration {
  id: number;
  topic: string;
  status: string;
}

const DissertationDeclarationsList: React.FC = () => {
  // Memoize the fetch function to avoid unnecessary re-renders
  const fetchDeclarations = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    const response = await apiClient.get('dissertation_declarations/list/', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }, []);

  // Use the custom hook with fallback to dummy data
  const { data: declarations, loading} = useFetchWithFallback<DissertationDeclaration[]>(
    fetchDeclarations,
    dummyDissertationDeclarations
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ width: '80%', maxWidth: '900px' }}>
        <h1 style={{ textAlign: 'center' }}>Dissertation Declarations</h1>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
            {declarations.length > 0 ? (
              declarations.map((declaration) => (
                <li
                  key={declaration.id}
                  style={{
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <h3>
                    <Link
                      to={`/declarations/${declaration.id}`}
                      style={{
                        color: '#007bff',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      {declaration.topic}
                    </Link>
                  </h3>
                  <p>{declaration.status}</p>
                </li>
              ))
            ) : (
              <p>No Declarations found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DissertationDeclarationsList;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await apiClient.get('/projects/list/', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setProjects(response.data);
      } catch (error) {
        setError('Failed to fetch projects.');
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (id: number) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ width: '80%', maxWidth: '900px' }}>
        <h1 style={{ textAlign: 'center' }}>My Projects</h1>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} style={{
                padding: '20px',
                border: '1px solid #ccc', 
                borderRadius: '8px', 
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <h3
                  onClick={() => handleProjectClick(project.id)}
                  style={{
                    color: '#007bff',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  {project.title}
                </h3>
                <p>{project.description}</p>
              </li>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;

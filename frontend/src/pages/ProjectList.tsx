import React, { useEffect, useState } from 'react';
import apiClient from '../utils/api';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState('');

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

  return (
    <div style={{ display: 'center',justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ width: '80%', maxWidth: '900px' }}>
        <h1 style={{ textAlign: 'center' }}>My Projects</h1>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <li key={project.id} style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p>{project.requirements}</p>
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
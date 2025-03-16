import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchWithFallback } from '../hooks/useFetchWithFallback';
import { dummyProjects } from '../utils/staticdata';
import apiClient from '../utils/api';

// Define the Project interface based on the dummy data structure
interface Project {
  id: number;
  title: string;
  description: string;
}

const ProjectList: React.FC = () => {
  const navigate = useNavigate();

  // Memoize the fetch function to avoid unnecessary re-renders
  const fetchProjects = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    const response = await apiClient.get('/projects/list/', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }, []);

  // Specify the correct types for useFetchWithFallback
  const { data: projects, loading } = useFetchWithFallback<Project[]>(
    fetchProjects,
    dummyProjects
  );

  const handleProjectClick = (id: number) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div style={{ width: '80%', maxWidth: '900px' }}>
        <h1 style={{ textAlign: 'center' }}>My Projects</h1>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'left' }}>
            {projects.length > 0 ? (
              projects.map((project) => (
                <li
                  key={project.id}
                  style={{
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <h3
                    onClick={() => handleProjectClick(project.id)}
                    style={{
                      color: '#007bff',
                      textDecoration: 'underline',
                      cursor: 'pointer',
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
        )}
      </div>
    </div>
  );
};

export default ProjectList;

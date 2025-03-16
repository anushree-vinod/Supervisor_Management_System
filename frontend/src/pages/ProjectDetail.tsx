import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchWithFallback } from '../hooks/useFetchWithFallback'; 
import { dummyProjectDetail } from '../utils/staticdata'; // Dummy data
import apiClient from '../utils/api';

// Define the interface for project details
interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  requirements: string;
  is_active: string; // Use 'boolean' if it's actually a boolean
  assigned_student: string; // Or a number if it's an ID
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Memoize the fetch function to avoid unnecessary re-renders
  const fetchProjectDetails = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    const response = await apiClient.get(`/projects/${id}/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  }, [id]);

  // Use the custom hook with fallback to dummy data
  const { data: project, loading, error } = useFetchWithFallback<ProjectDetail>(
    fetchProjectDetails,
    dummyProjectDetail  // Fallback to dummy project data
  );

  const handleUpdate = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      // const response = 
      await apiClient.patch(`/projects/${id}/update/`, project, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      alert('Project updated successfully!');
      navigate('/project-list'); // Redirect after update
    } catch (error) {
      alert('Failed to update project.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const accessToken = localStorage.getItem('access_token');
      await apiClient.delete(`/projects/${id}/delete/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      alert('Project deleted successfully!');
      navigate('/project-list'); // Redirect after delete
    } catch (error) {
      alert('Failed to delete project.');
    }
  };

  if (loading) return <div>Loading...</div>;
  //if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', textAlign: 'left', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', color: '#007bff' }}>{project?.title}</h1>
      <div style={{ marginBottom: '20px' }}>
        <label><strong>Title:</strong></label>
        <input
          type="text"
          value={project?.title}
          readOnly
          style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
        />
        <label><strong>Description:</strong></label>
        <textarea
          value={project?.description}
          readOnly
          style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
        />
        <label><strong>Requirements:</strong></label>
        <input
          type="text"
          value={project?.requirements}
          readOnly
          style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
        />
        <label><strong>Assigned Student:</strong></label>
        <input
          type="text"
          value={project?.assigned_student ?? 'Not assigned'}
          readOnly
          style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleUpdate}
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;

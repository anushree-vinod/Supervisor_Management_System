import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';

interface Project {
  id: number;
  title: string;
  description: string;
  requirements: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  assigned_student_id: number | null;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    assigned_student_id: '' // This will store assigned student ID
  });
  const [isEditable, setIsEditable] = useState(false); // Track if fields should be editable

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await apiClient.get(`/projects/${id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setProject(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          requirements: response.data.requirements,
          assigned_student_id: response.data.assigned_student ?? '' // If null, set empty string
        });
      } catch (error) {
        setError('Failed to fetch project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await apiClient.patch(`/projects/${id}/update/`, formData, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      // After a successful update, update the formData with the response data
      setFormData({
        title: response.data.title,
        description: response.data.description,
        requirements: response.data.requirements,
        assigned_student_id: response.data.assigned_student_id ?? '' // Update the assigned_student_id with the response data
      });

      // Notify user and disable editing
      alert('Project updated successfully!');
      setIsEditable(false); // Disable editing after update
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
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      alert('Project deleted successfully!');
      navigate('/project-list'); // Redirect after delete
    } catch (error) {
      alert('Failed to delete project.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', textAlign: 'left', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center', color: '#007bff' }}>{project?.title}</h1>
      <div style={{ marginBottom: '20px' }}>
        <label><strong>Title:</strong></label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          disabled={!isEditable} // Disable if not editable
          style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
        />
        <label><strong>Description:</strong></label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          disabled={!isEditable} // Disable if not editable
          style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
        />
        <label><strong>Requirements:</strong></label>
        <input
          type="text"
          name="requirements"
          value={formData.requirements}
          onChange={handleInputChange}
          disabled={!isEditable} // Disable if not editable
          style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
        />
        <label><strong>Assigned Student ID:</strong></label>
        <input
          type="text"
          name="assigned_student_id"
          value={formData.assigned_student_id}
          onChange={handleInputChange}
          disabled={!isEditable} // Disable if not editable
          style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {!isEditable ? (
          <button
            onClick={() => setIsEditable(true)} // Enable editing
            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleUpdate}
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Update
          </button>
        )}

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

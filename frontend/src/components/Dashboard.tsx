import React, { useState, useEffect } from 'react';
import apiClient from '../utils/api';

const Dashboard = () => {
  const [data, setData] = useState<{ completedProjects: number; supervisees: number }>({
    completedProjects: 0,
    supervisees: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');

        // Fetch the number of projects under the supervisor
        const projectResponse = await apiClient.get('/projects/list/', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        // Fetch the number of supervisees (students with declarations)
        const declarationsResponse = await apiClient.get('/dissertation_declarations/list/', {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        setData({
          completedProjects: projectResponse.data.length, // Count the number of projects
          supervisees: declarationsResponse.data.length, // Count the number of supervisees
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading while fetching data
  }

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.title}>Supervisor Dashboard</h2>
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h3>Research Projects</h3>
          <p>{data.completedProjects}</p>
        </div>
        <div style={styles.card}>
          <h3>Supervisees</h3>
          <p>{data.supervisees}</p>
        </div>
      </div>
    </div>
  );
};

// Define styles with proper typing
const styles: { [key: string]: React.CSSProperties } = {
  dashboardContainer: {
    display: 'flex',               // Use flexbox for centering the content
    justifyContent: 'center',      // Center horizontally
    alignItems: 'center',          // Center vertically
    height: '100vh',               // Full viewport height
    flexDirection: 'column',       // Stack title above the cards
    textAlign: 'center',           // Center text inside the container
    marginLeft: "400px",
  },
  title: {
    fontSize: '24px',              // Adjust title font size
    marginBottom: '30px',          // Space between title and cards
  },
  cardsContainer: {
    display: 'flex',               // Use flex to align cards side by side
    justifyContent: 'center',      // Center cards horizontally
    alignItems: 'center',          // Ensure cards are vertically centered as well
    gap: '30px',                   // Add space between the cards
  },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    width: '200px',                // Fixed width for consistent card size
    height: '150px',               // Fixed height for consistent card size
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',               // Flexbox inside the card
    flexDirection: 'column',       // Stack content vertically inside card
    alignItems: 'center',          // Center content horizontally inside card
    justifyContent: 'center',      // Center content vertically inside card
  },
};

export default Dashboard;

import React, { useCallback } from 'react';
import { useFetchWithFallback } from '../hooks/useFetchWithFallback';
import { dummyDashboardData } from '../utils/staticdata';
import apiClient from '../utils/api';

const Dashboard = () => {
  const accessToken = localStorage.getItem('access_token');

  // Memoize the fetch function to avoid unnecessary re-renders
  const fetchDashboardData = useCallback(async () => {
    const projectResponse = await apiClient.get('/projects/list/', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const declarationsResponse = await apiClient.get('/dissertation_declarations/list/', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return {
      researchProjects: projectResponse.data.length,
      supervisees: declarationsResponse.data.length,
    };
  }, [accessToken]);

  const { data, loading } = useFetchWithFallback(fetchDashboardData, dummyDashboardData);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.title}>Supervisor Dashboard</h2>
      {/* {error && <p style={styles.errorMessage}>{error}</p>} */}
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Research Projects</h3>
          <p style={styles.cardContent}>{data.researchProjects}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Supervisees</h3>
          <p style={styles.cardContent}>{data.supervisees}</p>
        </div>
      </div>
    </div>
  );
};

// Define styles with proper typing
const styles: { [key: string]: React.CSSProperties } = {
  dashboardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
    textAlign: 'center',
    margin: '0',
    padding: '20px',
    width: '100%',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#5b8fa9',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  card: {
    border: '1px solid #ddd',
    padding: '20px',
    width: '250px',
    height: '180px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    transition: 'none',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#007bff',
    marginBottom: '10px',
  },
  cardContent: {
    fontSize: '24px',
    color: '#333',
    fontWeight: 'bold',
  },
};

export default Dashboard;

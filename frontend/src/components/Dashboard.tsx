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
          <h3 style={styles.cardTitle}>Research Projects</h3>
          <p style={styles.cardContent}>{data.completedProjects}</p>
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
    margin: "0",              
    padding: '20px',         
    width: '100%'      
  },
  title: {
    fontSize: '32px',              
    fontWeight: 'bold',            
    marginBottom: '30px',          
    color: '#5b8fa9',                 
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
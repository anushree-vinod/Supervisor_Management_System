import React from 'react';
import { Link } from 'react-router-dom';

// Define the styles for the navbar
const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    backgroundColor: '#333',         // Dark background for the navbar
    color: 'white',                  // Text color white
    padding: '15px 30px',            // Padding around the navbar
    display: 'flex',                 // Flexbox to arrange items
    justifyContent: 'space-between', // Space between buttons
    alignItems: 'center',            // Center items vertically
    position: 'fixed',                // Make navbar fixed at the top
    top: 0,                           // Ensure navbar is positioned at the top
    left: '50%',                      // Move the navbar to the middle
    transform: 'translateX(-50%)',    // Center navbar by adjusting its position
    zIndex: 1000,                    // Keep navbar at top even when scrolled
  },
  button: {
    backgroundColor: '#4CAF50',      // Green background for the buttons
    border: 'none',                  // Remove button border
    color: 'white',                  // Button text color
    padding: '10px 20px',            // Button padding
    textAlign: 'center',             // Center text in buttons
    textDecoration: 'none',          // Remove text underline
    display: 'inline-block',         // Keep the button inline
    fontSize: '16px',                // Font size for the buttons
    margin: '0 10px',                // Margin between buttons
    cursor: 'pointer',              // Pointer cursor for hover effect
    borderRadius: '5px',             // Rounded corners for the buttons
    transition: 'background-color 0.3s', // Smooth transition for hover effect
  },
  buttonHover: {
    backgroundColor: '#45a049',      // Darker green on hover
  }
};

// Navbar component
const AppNavbar: React.FC = () => {
  return (
    <div style={styles.navbar}>
      {/* Link to navigate to Add New Project page */}
      <Link to="/add-project" style={{ textDecoration: 'none' }}>
        <button style={styles.button}>Add New Project</button>
      </Link>

      {/* Link to navigate to Dissertation Agreements page */}
      <Link to="/dissertation-agreements" style={{ textDecoration: 'none' }}>
        <button style={styles.button}>Dissertation Agreements</button>
      </Link>

      {/* Link to navigate to Student Outreach page */}
      <Link to="/student-outreach" style={{ textDecoration: 'none' }}>
        <button style={styles.button}>Student Outreach</button>
      </Link>
    </div>
  );
};

export default AppNavbar;

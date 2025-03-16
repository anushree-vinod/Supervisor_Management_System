import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {

  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  const handleLogout = () => {
    // Clear user session (remove from localStorage, context, etc.)
    localStorage.clear();
    // Redirect to the login page or home
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={styles.title}>Supervisor Management System</h1>
      </Link>
      <div style={styles.navContainer}>
        <Link to="/project-list" style={styles.navButton}>View Projects</Link>
        <Link to="/add-project" style={styles.navButton}>Add Projects</Link>
        <Link to="/declarations" style={styles.navButton}>Dissertation Declarations</Link>
        <Link to="/student-outreach" style={styles.navButton}>Student Outreach</Link>
        {isLoggedIn && (
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      )}
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: "#417690",
    color: "#fff",
    padding: "20px 20px",
    display: "flex",
    alignItems: "center",     //Aligns title & buttons in a single row
    justifyContent: "space-between", //Title stays left, buttons move right
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1000,
    height: "50px",
  },
  title: {
    fontSize: "27px",
    fontWeight: "bold",
  },
  navContainer: {
    display: "flex",
    gap: "5px",         //Adds spacing between buttons
    padding: "0px 30px"
  },
  navButton: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    padding: "10px 15px",
    backgroundColor: "#264b5d",
    borderRadius: "10px",
    transition: "background 0.3s",
    textAlign: "center",
    minWidth: "100px", //  Ensures uniform button width
    marginLeft: "50px"
  },
  logoutButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    padding: "10px 15px",
    textDecoration: "none",
    borderRadius: "10px",
    transition: "background 0.3s",
    textAlign: "center",
    minWidth: "100px", //  Ensures uniform button width
    marginLeft: "50px"
  },
};

export default Header;

import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header'; 
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AddProject from './pages/AddProjects';
import ProjectList from './pages/ProjectList'; 
import ProjectDetail from './pages/ProjectDetail' 
import DissertationDeclarationsList from './pages/DissertationDeclarationsList'; 
import DissertationDeclarationDetail from './pages/DissertationDeclarationDetail';
import StudentOutreach from "./pages/StudentOutreach";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: "80px", paddingBottom: "50px", textAlign: 'center' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RedirectIfNotLoggedIn />} />
          <Route path="/Supervisor_Management_System/" element={<RedirectIfNotLoggedIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/project-list" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/declarations" element={<DissertationDeclarationsList />} />
          <Route path="/declarations/:id" element={<DissertationDeclarationDetail />} />
          <Route path="/student-outreach" element={<StudentOutreach />} /> 
        </Routes>
      </div>
      <Footer />
    </>
  );
};

const RedirectIfNotLoggedIn: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem('access_token')); // Check if the user is logged in
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      navigate('/dashboard'); // Otherwise, proceed to the dashboard
    }
  }, [navigate]);

  return null; // Don't render anything here
};

export default App;

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
import apiClient from './utils/api';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ paddingTop: "80px", paddingBottom: "50px", textAlign: 'center' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RedirectIfNotLoggedIn />} />
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
    const checkBackendAndAuth = async () => {
      try {
        // Try fetching something lightweight to check backend connectivity
        await apiClient.get('/user_management/ping/');
        localStorage.setItem('dummy_mode', 'false');  // Backend is accessible — no dummy mode
      } catch (error) {
        console.warn('Backend unreachable. Enabling dummy mode.');
        localStorage.setItem('dummy_mode', 'true');  // Enable dummy mode if backend is unreachable
      }
    };

    checkBackendAndAuth();
  }, [navigate]);

  useEffect(() => {
      if(localStorage.getItem('dummy_mode') === 'true'){
       navigate('/dashboard') 
      }
      else {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        navigate(isLoggedIn ? '/dashboard' : '/login');
      }
  }, [navigate]);

  return null;  // No UI, just redirection logic
};

export default App;

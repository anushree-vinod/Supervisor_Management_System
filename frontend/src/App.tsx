import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
          <Route path="/" element={<Dashboard />} />
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

export default App;

// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h2>Welcome to Supervisor Management Module</h2>
      <p>
        <Link to="/register/student">Research Projects Completed</Link>
      </p>
      <p>
        <Link to="/register/supervisor">Register as Supervisor</Link>
      </p>
      <p>
        <Link to="/login/student">Login </Link>
      </p>
    </div>
  );
};

export default Home;

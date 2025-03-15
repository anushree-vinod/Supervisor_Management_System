// src/pages/StudentOutreach.tsx
import React from "react";

// Placeholder data
const projects = [
  {
    id: 1,
    title: "AI Research for Healthcare",
    description: "Exploring AI applications in healthcare.",
    interestedStudents: ["Alice Smith", "Bob Johnson", "Charlie Lee"],
  },
  {
    id: 2,
    title: "Machine Learning for Climate Change",
    description: "Using ML to predict climate patterns.",
    interestedStudents: ["David Miller", "Emma Brown"],
  },
  {
    id: 3,
    title: "Blockchain for Secure Voting Systems",
    description: "Research on blockchain to ensure secure voting systems.",
    interestedStudents: ["Fiona White"],
  },
];

const StudentOutreach: React.FC = () => {
  return (
    <div>
      <h1>Student Outreach: Expressions of Interest</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <h4>Interested Students:</h4>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {project.interestedStudents.length > 0 ? (
                project.interestedStudents.map((student, index) => (
                  <li key={index}>{student}</li>
                ))
              ) : (
                <li>No students have expressed interest yet.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentOutreach;

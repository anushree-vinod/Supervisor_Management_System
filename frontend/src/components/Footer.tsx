// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Supervisor Management System. All rights reserved.</p>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    height: "40px",
    lineHeight: "10px",
    //padding: "1px 1px",
  },
};

export default Footer;

import React from 'react';

// näyttää esimerkiksi tekijänoikeustiedot, saataa olla ihan turha
const Footer = () => {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} To-Do Lista</p>
    </footer>
  );
};

export default Footer;

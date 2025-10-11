import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/50">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Geeddi AI Learning Academy. All Rights Reserved.</p>
        <p className="text-xs mt-1">This is a fictional application for demonstration purposes.</p>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import './logo.css'; // Import CSS file for styling

function Logo() {
  return (
    <div className="logo-container">
      <img src={require('../images/logo.png')} alt="Logo" />
      {/* <div className="logo-text">Your Logo Text</div> */}
    </div>
  );
}

export default Logo;

import React from "react";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>Event Management App</h1>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#4CAF50", 
  color: "white",
  padding: "20px",
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
};

export default Header;

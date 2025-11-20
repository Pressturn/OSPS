import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../services/authService";
import "./NavBar.css";

const NavBar = () => {
  const handleSignOut = () => {
    signOut();
    window.location.href = "/"; //go homepage after signing out
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          <Link to="/receipts/new">Create New Receipt</Link>
          <Link to="/receipts">View All Receipts</Link>
          <Link to="/dashboard">View My Balance Summary</Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../services/authService"

const NavBar = () => {
  const handleSignOut = () => {
    signOut()
    window.location.href = "/";
  };

  return (
    <nav>
      <div>
        <div>
          <Link to="/receipts/new">Create New Receipt</Link>
          <Link to="/receipts">View All Receipts</Link>
          <Link to="/groups">Groups</Link>
          <Link to="/dashboard">View My Balance Summary</Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

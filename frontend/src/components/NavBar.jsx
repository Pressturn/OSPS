import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
};

return (
  <nav>
    <div>
      <div>
        <Link to="/create">Create New Receipt</Link>
        <Link to="/receipts">View All Receipts</Link>
        <Link to="/groups">Groups</Link>
        <Link to="dashboard">View My Balance Summary</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  </nav>
);

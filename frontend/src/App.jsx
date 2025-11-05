import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "/components/NavBar.jsx";
import ReceiptList from "./components/AllReceiptsPage/ReceiptList";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/receipts" element={<ReceiptList />} />
      </Routes>
    </Router>
  );
}

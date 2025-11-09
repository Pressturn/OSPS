import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx"; 
import ReceiptList from "./components/AllReceiptsPage/ReceiptList";
import SingleReceiptDetail from "./components/ViewSingleReceipt/SingleReceiptDetail";
import ReceiptForm from "./components/EditReceiptPage/ReceiptForm";
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/receipts" element={<ReceiptList />} />
        <Route path="/receipts/:id" element={<SingleReceiptDetail />} />
        <Route path="/receipts/:id/edit" element={<ReceiptForm />} />
      </Routes>
    </Router>
  );
}

export default App;

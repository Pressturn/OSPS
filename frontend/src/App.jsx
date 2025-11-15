import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import ReceiptList from "./components/AllReceiptsPage/ReceiptList";
import SingleReceiptDetail from "./components/ViewSingleReceipt/SingleReceiptDetail";
import ReceiptForm from "./components/EditReceiptPage/ReceiptForm";
import './App.css';
import SignUpPage from "./components/SignUpPage/SignUpPage.jsx"
import SignInPage from "./components/SignInPage/SignInPage.jsx"

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path="/receipts" element={<ReceiptList />} />
        <Route path="/receipts/:id" element={<SingleReceiptDetail />} />
        <Route path="/receipts/:id/edit" element={<ReceiptForm />} />
      </Routes>
    </Router>
  );
}

export default App;

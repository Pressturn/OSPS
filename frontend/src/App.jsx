import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import ReceiptList from "./components/AllReceiptsPage/ReceiptList";
import SingleReceiptDetail from "./components/ViewSingleReceipt/SingleReceiptDetail";
import ReceiptForm from "./components/EditReceiptPage/ReceiptForm";
import SelectFriend from "./components/CreateReceipt/SelectFriend";
import CreateReceipt from "./components/CreateReceipt/CreateReceipt";
import './App.css';
import SignUpPage from "./components/SignUpPage/SignUpPage.jsx"
import SignInPage from "./components/SignInPage/SignInPage.jsx"
import WelcomePage from "./components/WelcomePage/WelcomePage.jsx"

function App() {
  const location = useLocation()
  const hideNavBar = ['/', '/signin', '/signup'].includes(location.pathname)

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/signin' element={<SignInPage />} />
        <Route path="/receipts" element={<ReceiptList />} />
        <Route path="/receipts/new" element={<SelectFriend />} />
        <Route path="/receipts/new/details" element={<CreateReceipt />} />
        <Route path="/receipts/:id" element={<SingleReceiptDetail />} />
        <Route path="/receipts/:id/edit" element={<ReceiptForm />} />
      </Routes>
    </>
  );
}

export default App;

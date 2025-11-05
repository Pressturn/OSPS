import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReceipts } from "../../services/receiptService";
import "./ReceiptList.css";

const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
};

useEffect(() => {
  fetchReceipts();
}, []);

const fetchReceipts = async () => {
  try {
    setLoading(true);
    const data = await getAllReceipts();
    setReceipts(data);
    setError(null);
  } catch (err) {
    setError("failed to load receipt. try again");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

if (loading) {
  return <div>Loading receipt...</div>;
}

if (error) {
  return <div>{error}</div>;
}

return (
  <>
    <div>
      <h1>All Receipts</h1>
      <p>{receipts.length} receipts found</p>

      {receipts.length === 0 ? (
        <p>No receipts found. Start by creating one.</p>
      ) : (
        <div>
          {receipts.map((receipt) => (
            <div
              key={receipt._id}
              onClick={() => handleReceiptClick(receipt._id)}
            >
              <h2>{receipt.title}</h2>
              <p>{receipt.description}</p>
              <p>Paid By: {receipt.paidBy?.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
);

export default ReceiptList;

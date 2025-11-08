import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReceiptById } from "../../../../backend/controllers/receiptController";

const ReceiptDetail = () => {
  const { id } = useParams; // get the receipt ID from URL slug
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReceipt();
  }, [id]);

  const fetchReceipt = async () => {
    try {
      setLoading(true);
      const data = await getReceiptById(id);
      setReceipt(data);
      setError(null);
    } catch (err) {
      setError("failed to load receipt, try again");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading receipt details please wait...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!receipt) {
    return <div>Receipt not found</div>;
  }

  return (
    <>
    <div>
        <button onClick={()=> navigate("/receipts")}>Back to all receipts</button>

        <h1>Receipt Details</h1>
    </div>
    </>
  )
};

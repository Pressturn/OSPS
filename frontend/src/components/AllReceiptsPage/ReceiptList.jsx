import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllReceipts } from "../../services/receiptService";
import "./ReceiptList.css";

const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      setLoading(true);
      //get all receipts and store them
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

  //when a receipt is clicked, navigate there
  const handleReceiptClick = (receiptId) => {
    navigate(`/receipts/${receiptId}`);
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-box">
          <p className="loading-message">Loading receipts...</p>
        </div>
      </div>
    )
  }


  if (error) {
    return (
      <div className="page-container">
        <div className="page-box">
          <p className="error-message">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="page-box">
        <h1 className="page-title">All Receipts</h1>
        <button className="btn-primary"
          onClick={() => navigate('/receipts/new')}>+ Create New Receipt</button>

        {receipts.length === 0 ? (
          <p className="empty-message">No receipts found. Start by creating one.</p>
        ) : (
          <div>
            {receipts.map((receipt) => (
              <div
                key={receipt._id}
                onClick={() => handleReceiptClick(receipt._id)}
                className="receipt-item"
              >
                <p className="receipt-description">{receipt.description}</p>
                <p className="receipt-paid-by">Paid By: {receipt.paidBy?.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptList;

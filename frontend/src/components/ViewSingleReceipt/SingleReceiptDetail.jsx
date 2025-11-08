import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReceiptById, deleteReceipt } from "../../services/receiptService";

const ReceiptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReceipt = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    fetchReceipt();
  }, [fetchReceipt]);

  const handleDelete = async (receiptId) => {
    if (window.confirm("Are you sure you want to delete this receipt?")) {
      try {
        await deleteReceipt(receiptId);
        navigate("/receipts");
      } catch (err) {
        alert("failed to delete receipt");
      }
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
    <div>
      <button onClick={() => navigate("/receipts")}>
        Back to all receipts
      </button>

      <h1>Receipt Details</h1>

      <div>
        <div>
          <strong>Description:</strong>
          <span>{receipt.description}</span>
        </div>

        <div>
          <strong>Amount:</strong>
          <span>${receipt.amount.toFixed(2)}</span>
        </div>

        <div>
          <strong>Paid By:</strong>
          <span>{receipt.paidBy?.name}</span>
        </div>

        <div>
          <strong>Split Between:</strong>
          <div>
            {receipt.splitBetween?.map((split, index) => (
              <div key={index}>
                <span>{split.user?.name}</span>
                <span> - ${split.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <button onClick={() => navigate(`/receipts/${id}/edit`)}>
            Edit Receipt
          </button>
          <button onClick={() => handleDelete(id)}>Delete Receipt</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptDetail;

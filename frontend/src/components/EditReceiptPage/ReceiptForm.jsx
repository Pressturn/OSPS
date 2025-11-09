import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReceiptById, updateReceipt } from "../../services/receiptService";

const ReceiptForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
  });

  //have a state so that we can track whats the original
  const [originalReceipt, setOriginalReceipt] = useState(null);

  useEffect(() => {
    fetchReceipt();
  }, [id]);

  const fetchReceipt = async () => {
    try {
      setLoading(true);
      const receipt = await getReceiptById(id);
      setOriginalReceipt(receipt);

      //FILL UP THE FORM WITH existing receipt data
      setFormData({
        description: receipt.description || "",
        amount: receipt.amount || "",
      });

      setError(null);
    } catch (err) {
      setError("failed to load receipt");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await updateReceipt(id, formData);

      setSuccessMessage("Receipt updated successfully!");
      setTimeout(() => {
        navigate(`/receipts/${id}`);
      }, 1500);
    } catch (err) {
      setError("Failed to update receipt");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/receipts/${id}`);
  };

  if (loading && !originalReceipt) {
    return <div>Loading receipt...</div>;
  }

  return (
    <div>
      <h1>Edit Receipt</h1>
      <p>Update your receipt details below</p>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="amount">Total Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Receipt"}
          </button>
          <button type="button" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default ReceiptForm;

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

  

  useEffect(() => {
    fetchReceipt();
  }, [id]);

  const fetchReceipt = async () => {
    try {
      setLoading(true);
      //fetch receipt by ID from mongoDB backend
      const receipt = await getReceiptById(id);

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
    //update form with whatever user types in field
    const { name, value } = e.target;
    //only change the field that you updated
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

      //call the backend to update receipt
      await updateReceipt(id, formData);

      setSuccessMessage("Receipt updated successfully!");
      //navigate back to reeipte detail page after 1.5s
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

  return (
    <div>
      <h1>Edit Receipt</h1>
      <p>Update your receipt details below</p>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        {/* 
Description of expense */}
        <div>
          <label>Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* 
Total amount */}
        <div>
          <label> Total Amount ($) </label>
          <input
            type="number"
            id="amount"
            name="amount"
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

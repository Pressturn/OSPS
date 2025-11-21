import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReceiptById, updateReceipt } from "../../services/receiptService";
import "./ReceiptForm.css";

const ReceiptForm = () => {
  const { id } = useParams(); //extract id from url slugs
  const navigate = useNavigate(); //redirect users to other pages

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
  });

  //usecallback remembers function from before, eg. id=123, component re-renders, fetchreceipt same, useeffect sees no change in fetchreceipt, doesnt run, avoids infinite loop
  // function RECREATED when id changes, otherwise return saved version from before
  const fetchReceipt = useCallback(async () => {
    try {
      setLoading(true); //show loading when 1st fetching data
      //fetch receipt by ID from mongoDB backend
      const receipt = await getReceiptById(id);

      //update state with existing receipt data
      setFormData({
        description: receipt.description || "",
        amount: receipt.amount || "",
      });

      //clear all prev errors
      setError(null);
    } catch (err) {
      setError("failed to load receipt");
      console.error(err);
    } finally {
      setLoading(false); //whether data fetch suceed or fail, show loading false
    }
  }, [id]); // recreates function receipt id dependency changes

  useEffect(() => {
    fetchReceipt(); //fetchreceipt is executed
  }, [fetchReceipt]); //only runs when fetchreceipt recreated

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
    <div className="page-container">
      <div className="page-box">
        <h1 className="page-title">Edit Receipt</h1>
        <p className="page-subtitle">Update your receipt details below</p>

        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* 
Description of expense */}
            <label>Description</label>
            <input
              type="text"
              className="form-input"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          {/* 
Total amount */}
          <div className="form-group">
            <label> Total Amount ($) </label>
            <input
              type="number"
              className="form-input"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="button-group">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Receipt"}
            </button>
            <button
              className="btn-secondary"
              type="button"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ReceiptForm;

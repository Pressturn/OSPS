import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getReceiptById,
  updateReceipt,
} from "../../../../backend/controllers/receiptController";

const ReceiptForm = () => {
  const { id } = useParams;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
};

const [formData, setFormData] = useState({
  description: "",
  total: "",
  date: "",
  paidBy: "",
});

//have a state so that we can track whats the original
const [orignalReceipt, setOriginalReceipt] = useState(null);

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
      description: receipt.description,
      total: receipt.total,
      date: receipt.date,
      paidBy: receipt.paidBy,
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

  if(!formData.description || !formData.total){
    setError('Please fill in all required fields');
    return;
  }

  if(formData.total <=0){
    setError ('Total amount myust be >0');
    return;
  }

  try {
    setLoading(true);
    setError(null);
  }
};

return (
    <>
    <h1>Edit Receipt</h1>
    <p>Update your receipt details below</p>

    <form onSubmit={handleSubmit} />
{/* 
Description of expense */}
<div>
    <label>Description</label>
    <input
    type='text'
    id='description'
    name='description'
    value={formData.description}
    onChange={handleInputChange}
    required></input>
    </div>
{/* 
Total amount */}
    <div>
        <label> Total Amount ($) </label>
        <input
        type='number'
        value={formData.total}
        onChange={handleInputChange}
        required
        />
    </div>
{/* 
Date */}
    <div>
        <label> Date </label>
        <input
        type='date'
        value={formData.date}
        onChange={handleInputChange}
        required
        />
    </div>
{/* 
    Cancel button */}
    <div>
        <button
        type='button'
        onClick={handleCancel}
        disabled={loading}></button>
    </div>
    </>
)

export default ReceiptForm;
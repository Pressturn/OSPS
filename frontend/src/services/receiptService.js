//jon

import axios from "axios";
const BASE_URL = "https://osps-backend.onrender.com";
// const BASE_URL = "http://localhost:3000";


//axios configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//get all the receipts created
const getAllReceipts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/receipts", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching receipts", error);
    throw error;
  }
};

//get a single receipt by ID
const getReceiptById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/receipts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching receipt:", error);
    throw error;
  }
};

//update or edit an existing receipt
const updateReceipt = async (id, receiptData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(`/receipts/${id}`, receiptData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("error updating receipt:", error);
    throw error;
  }
};

//delete receipt
const deleteReceipt = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/receipts/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting receipt:", error);
    throw error;
  }
};

const getUserBalance = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/receipts/balance`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
}

export {
  getAllReceipts,
  getReceiptById,
  updateReceipt,
  deleteReceipt,
  getUserBalance,
}

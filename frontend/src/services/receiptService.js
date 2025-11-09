//jon

import axios from "axios";
const BASE_URL = "http://localhost:3000";

//axios configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

//get all the receipts created
export const getAllReceipts = async () => {
  try {
    const response = await api.get("/receipts");
    return response.data;
  } catch (error) {
    console.error("Error fetching receipts", error);
    throw error;
  }
};

//get a single receipt by ID
export const getReceiptById = async (id) => {
  try {
    const response = await api.get(`/receipts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching receipt:", error);
  }
  throw error;
};

//update or edit an existing receipt
export const updateReceipt = async (id, receiptData) => {
  try {
    const response = await api.put(`/receipts/${id}`, receiptData);
    return response.data;
  } catch (error) {
    console.error("error updating receipt:", error);
  }
  throw error;
};

//delete receipt
export const deleteReceipt = async (id) => {
  try {
    const response = await api.delete(`/receipts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting receipt:", error);
    throw error;
  }
};

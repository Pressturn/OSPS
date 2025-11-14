import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateReceipt() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    splitBetween: [],
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      setError("Fail to load user");
      console.log("Error", error);
    }
  };

  //who did you share your receipt with, split the amounts
  const handleAddUser = (userId, splitAmount) => {
    const alreadyAdded = formData.splitBetween.some(split=> split.user === userId);
    
    if (alreadyAdded){
      alert('This user is already added');
      return;
    }

    const newSplit = {
      user: userId,
      amount: parseFloat(splitAmount),
    };

    setFormData({
      ...formData,
      splitBetween: [...formData.splitBetween, newSplit],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //get token for JWT authentication
    const token = localStorage.getItem("token");

    //call axios to create the receipt
    await axios.post("http://localhost:3000/receipts", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSuccessMessage("receipt created");
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div>Create New Receipt</div>
      <p>Split an expense with your friend!</p>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Where did you spend it on?"
            required
          />
        </div>

        <div>
          <label>Total Amount $</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter total amount of your receipt"
            required
          />
        </div>

        {/* able to select which user you split with */}
        <div>
          <label> Split With who?</label>
          <select
          onChange={(e)=> {
            const userId = e.target.value;
          }}></select>
        </div>

        {/* Display who you are splitting with and how much */}
        <div>
          <h2>Split Between these people:</h2>

          {formData.splitBetween.map((split, index) => (
            <div key={index}>
              <span>
                User: {split.user} - ${split.amount}
              </span>
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          Create Receipt
        </button>
      </form>
    </div>
  );
}

export default CreateReceipt;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function CreateReceipt() {
  const navigate = useNavigate();
  const location = useLocation();

  const [allUsers, setAllUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAddedUsers(location.state?.selectedFriends || []);
    axios.get("http://localhost:3000/users")
      .then(response => setAllUsers(response.data))
      .catch(error => console.log("Fail to fetch users:", error))
  }, [location]);

  const getUserName = (email) => allUsers.find(user => user.email === email)?.name || email;

  const split = amount ? (parseFloat(amount) / (addedUsers.length + 1)).toFixed(2) : "0.00";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/receipts", {
        description,
        amount: parseFloat(amount),
        splitBetween: addedUsers.map(email => ({ email, amount: parseFloat(split) }))
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/receipts");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate("/receipts/new")}>← Back</button>
        <h1>Add Expense</h1>
        <button onClick={handleSubmit} disabled={loading || !description || !amount}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Friends - Clickable to add more */}
      <div onClick={() => navigate("/receipts/new", { state: { existingFriends: addedUsers } })}>
        <label>With you and:</label>
        <div>
          {addedUsers.map((email, i) => (
            <div key={i}>
              <span>{getUserName(email)[0].toUpperCase()}</span>
              <span>{getUserName(email)}</span>
            </div>
          ))}
          <span>+ Add more</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <span>SGD</span>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            required
          />
        </div>

        <div>
          Paid by <strong>you</strong> and split <strong>equally</strong>
        </div>

        {/* Split preview */}
        {amount > 0 && (
          <div>
            <h3>Split Details</h3>

            <div>
              <span>You</span>
              <span>SGD {split}</span>
            </div>

            {addedUsers.map((email, i) => (
              <div key={i}>
                <span>{getUserName(email)}</span>
                <span>SGD {split}</span>
              </div>
            ))}

            <div>
              <span>Total</span>
              <span>SGD {amount}</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default CreateReceipt;

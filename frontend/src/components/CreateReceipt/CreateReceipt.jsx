import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllUsers, createReceipt } from "../../services/receiptService";
import "./CreateReceipt.css"

function CreateReceipt() {
  const navigate = useNavigate();
  const location = useLocation();

  const [allUsers, setAllUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setAddedUsers(location.state?.selectedFriends || []);
    getAllUsers()
      .then(users => setAllUsers(users))
      .catch(error => console.log("Fail to fetch users:", error))
  }, [location]);

  const getUserName = (email) => allUsers.find(user => user.email === email)?.name || email;

  const split = amount ? (parseFloat(amount) / (addedUsers.length + 1)).toFixed(2) : "0.00";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const currentUserId = localStorage.getItem("userId");

      // Convert emails to user IDs for other users
      const otherUsers = addedUsers.map(email => {
        const user = allUsers.find(u => u.email === email);
        return { user: user._id, amount: parseFloat(split) };
      });

      // Include yourself in the split
      const splitBetween = [
        ...otherUsers,
        { user: currentUserId, amount: parseFloat(split) }
      ];

      await createReceipt({
        description,
        amount: parseFloat(amount),
        splitBetween
      });
      navigate("/receipts");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-container">
      <div className="page-box">
        <button className="back-btn"
          onClick={() => navigate("/receipts/new")}>
          ← Back</button>

        <h1 className="page-title">Add Expense</h1>

        {/* Friends - Clickable to add more */}
        <div className="friends-section"
          onClick={() => navigate("/receipts/new", { state: { existingFriends: addedUsers } })}>
          <label>With you and:</label>
          <div className="friends-list">
            {addedUsers.map((email, i) => (
              <span key={i} className="friend-name">
                {getUserName(email)}, </span>
            ))}
            <span className="add-more-link">+ Add more</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="form-input"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label>SGD</label>
            <input
              type="number"
              className="form-input"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="paid-info">
            Paid by <strong>you</strong> and split <strong>equally</strong>
          </div>

          {/* Split preview */}
          {amount > 0 && (
            <div className="split-preview">
              <h3>Split Details</h3>

              <div className="split-item">
                <span>You</span>
                <span>SGD {split}</span>
              </div>

              {addedUsers.map((email, i) => (
                <div key={i} className="split-item">
                  <span>{getUserName(email)}</span>
                  <span>SGD {split}</span>
                </div>
              ))}

              <div className="split-item split-total">
                <span>Total</span>
                <span>SGD {amount}</span>
              </div>
            </div>
          )}

          <button onClick={handleSubmit} className="btn-primary" 
          disabled={!description || !amount}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateReceipt;

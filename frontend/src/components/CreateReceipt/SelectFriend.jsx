import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SelectFriend() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);


  // Get all users data
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setAllUsers(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  // Run this function whenever any dependency changes; filter as user types
  useEffect(() => {
    const search = input.trim().toLowerCase(); 

    const filteredSearch = allUsers.filter(user => 
      (user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search))

      // Hide duplicate search result; prevent same user from being added twice
      &&!addedUsers.includes(user.email)
    );

    setFilteredUsers(filteredSearch)
  },[input, allUsers, addedUsers]);

  // Add a friend to the expense
  const addFriend = (email) => {

    // Checks if email excists and (if email exists) prevent added the same user twice
    if (email) {
      const newUser = [...addedUsers, email];
      setAddedUsers(newUser);
      setInput("");

      // !!Would need to update
      navigate("/receipts/new/details", { state: { selectedFriends: newUser } });
    }
  }
  
  // Convert email into user's name
  const getUserName = (email) => allUsers.find(user => user.email === email)?.name || email;

  return (
    <div>
      <h1>Add an expense</h1>
      <p>With you and: </p>

      <div>
        {addedUsers.map((email) => {
          const name = getUserName(email);
          return (
            <div key = {email}>
              <span>{name}</span>
              <button type="button" 
                onClick={() => setAddedUsers(addedUsers.filter(user => user !== email))}>
                x</button>
            </div>
          )
        })}
      </div>

      <input
        type = "text"
        placeholder = "Enter names or emails"
        value = {input}
        onChange = {(event) => setInput(event.target.value)}
      />

      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} onClick={() => addFriend(user.email)}>
              <div>{user.name}</div>
              <div>{user.email}</div>
            </div>
          ))
        ) : (
          <div>
            {input ? "No users found" : "No users available"}
          </div>
        )}
      </div>

    </div>
  )
}

export default SelectFriend;
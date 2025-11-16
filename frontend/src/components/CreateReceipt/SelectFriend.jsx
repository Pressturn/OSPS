import React from 'react';
import {useState, useEffect} from 'react';
import axios, { all } from 'axios';

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
      setError('Fail to load users');
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
      navigate("/receipts/new/details", { state: { selectedFriends: addFriend} });
    }
  }
  
  // Convert email into user's name
  const getUserName = (email) => allUsers.find(user => user.email === email)?.name || email;

  return (
    <div>AddUser</div>
  )
}

export default AddUser
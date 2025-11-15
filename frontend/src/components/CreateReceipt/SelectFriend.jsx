import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

function SelectFriend() {
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);

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



      try {
        const response = await axios.get("http://localhost:3000/users");
        setAllUsers(response.data);
        // Show first 5 users as "recent" for now
        setRecentFriends(response.data.slice(0, 5));
      } catch (err) {
        setError("Failed to load users");
        console.error(err);
      }
    };



  return (
    <div>AddUser</div>
  )
}

export default AddUser
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { createReceipt } from '../../../../backend/controllers/receiptController'
import { axios } from 'axios'

function CreateReceipt() {
   
    const navigate = useNavigate(); 

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const [formData, setFormData] = useState({
      description: '',
      amount: '',
      paidBy: ''

    })

    

    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
      fetchUsers();
    },[]);

    const fetchUsers = async () => {
      try{
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error){
        setError("Fail to load user");
        console.log('Error', error);
      };
    };

    const handleAddUser = (event) => {
      setAdd
    }
    
    const handleChange = (event) => {
      setFormData({...formData, [event.target.name]: event.target.value})
    };


  return (
    <div>CreateReceipt</div>
  )
}

export default CreateReceipt
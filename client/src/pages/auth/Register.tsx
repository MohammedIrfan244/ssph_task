import axios from "axios";
import { useState } from "react";


function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/auth/register', formData)
      if (response.data.success) {
        alert('User registered successfully');
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} >
<input type="text" value={formData.username} placeholder="username" onChange={(e)=>handleChange(e)} name="username" required />
<input type="email" placeholder="email" value={formData.email} required name="email" onChange={(e)=>handleChange(e)}/>
<input type="password" placeholder=" password" required value={formData.password} name="password" onChange={(e)=>handleChange(e)} />
<button>Register</button>
      </form>
      <p>Already have acc ? Login</p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export default Register

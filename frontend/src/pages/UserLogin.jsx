import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()
  const submitHandler = async (e) => {
  e.preventDefault();

  const userData = {
    email,
    password
  };

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token) 
      setEmail('');
      setPassword('');
      navigate('/home');
    }
  } catch (error) {
    
    alert("Login failed. ");
  }
};

  return (


    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-15 ml-2 mb-10 ' src=" https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e) => { submitHandler(e) }} action="">
          <h3 className='text-lg font-medium mb-4 '>What's your email</h3>
          <input value={email} onChange={(e) => {
            setEmail(e.target.value);
          }} className='bg-[#eeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-4'>Enter Password</h3>
          <input value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} className='bg-[#eeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base' required type="password" placeholder='Password' />
          <button className='bg-[#111] rounded px-4 py-2  w-full text-lg text-white mb-7'>Login</button>
        </form>
        <p className='text-center'>New here? <Link to={"/signup"} className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link to={'/captain-login'} className='bg-[#10b461] flex items-center justify-center rounded px-4 py-2  w-full text-lg text-white mb-7'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin
import { useState } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const { user, setUser } = React.useContext(UserDataContext)
  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password,
      fullname: {
        firstname,
        lastname
      }
    };

    try {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);


      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token',data.token) 
        setEmail('');
        setPassword('');
        setLastName('');
        setFirstName('');
        navigate('/home');
      }
    } catch (err) {

      alert("Registration failed");
    }


  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-15 ml-2 mb-10 ' src=" https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form onSubmit={(e) => { submitHandler(e) }} action="">
          <div className=''>
            <h3 className='text-lg font-medium mb-4 '>What's your name</h3>
            <div className=' flex gap-2 mb-7'>

              <input value={firstname} onChange={(e) => {
                setFirstName(e.target.value);
              }} className='bg-[#eeee]  rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-base' required type="text" placeholder='firstname' />
              <input value={lastname} onChange={(e) => {
                setLastName(e.target.value);
              }} className='bg-[#eeee]  rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-base' required type="text" placeholder='lastname' />
            </div>

          </div>
          <h3 className='text-lg font-medium mb-4 '>What's your email</h3>
          <input value={email} onChange={(e) => {
            setEmail(e.target.value);
          }} className='bg-[#eeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-4'>Enter Password</h3>
          <input value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} className='bg-[#eeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base' required type="password" placeholder='Password' />
          <button className='bg-[#111] rounded px-4 py-2  w-full text-lg text-white mb-7'>Create Account</button>
        </form>
        <p className='text-center'>Alread have a account? <Link to={"/login"} className='text-blue-600'>Login Here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, includig by automated means, from Uber and its affiliates to the number provider </p>
      </div>
    </div>
  )
}

export default UserSignup
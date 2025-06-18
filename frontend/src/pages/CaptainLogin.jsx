import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const CaptainLogin = () => {
   const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [captainData,setCaptainData] = useState({});
    const submitHandler=(e)=>{
      e.preventDefault();
      const data={
        email:email,
        password:password
      }
      setCaptainData(data);
      console.log(captainData);
      setEmail('');
      setPassword('');
    }
  return (
   <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
      <img className='w-20 ml-2 mb-10 ' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form onSubmit={(e)=>{submitHandler(e)}} action="">
        <h3 className='text-lg font-medium mb-4 '>What's your email</h3>
        <input value={email} onChange={(e)=>{
          setEmail(e.target.value);
        }} className='bg-[#eeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />
        <h3 className='text-lg font-medium mb-4'>Enter Password</h3>
        <input value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} className='bg-[#eeee] mb-7 rounded px-4 py-2 border  w-full text-lg placeholder:text-base' required type="password" placeholder='Password' />
        <button className='bg-[#111] rounded px-4 py-2  w-full text-lg text-white mb-7'>Login</button>
      </form>
      <p className='text-center'>Join us? <Link to={"/captain-signup"} className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
        <Link to={'/login'} className='bg-[#d5622d] flex items-center justify-center rounded px-4 py-2  w-full text-lg text-white mb-7'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const CaptainSignup = () => {
  const navigate= useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');


  const { captain, setCaptain } = React.useContext(CaptainDataContext)
const submitHandler = async (e) => {
  e.preventDefault();

  const captainData = {
    email: email,
    password: password,
    fullname: { // ✅ not fullName
      firstname: firstname,
      lastname: lastname
    },
    vehicle: {
      color: vehicleColor,
      plate: vehiclePlate,
      capacity: Number(vehicleCapacity),
      vehicleType: vehicleType // ✅ correct key
    }
  };

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      
      navigate('/captain-home');
    }
  } catch (err) {
    
    alert("Signup failed: " + (err?.response?.data?.message || "Please try again."));
  }

  // Reset form fields
  setEmail('');
  setPassword('');
  setFirstName('');
  setLastName('');
  setVehicleColor('');
  setVehiclePlate('');
  setVehicleCapacity('');
  setVehicleType('');
};

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-15 ml-2 mb-5 ' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form id="captain-register-form" onSubmit={(e) => { submitHandler(e) }} action="">
          <div className=''>
            <h3 className='text-lg font-medium mb-4 '>What's our Captain's name</h3>
            <div className=' flex gap-2 mb-7'>

              <input value={firstname} onChange={(e) => {
                setFirstName(e.target.value);
              }} className='bg-[#eeee]  rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-base' required type="text" placeholder='firstname' />
              <input value={lastname} onChange={(e) => {
                setLastName(e.target.value);
              }} className='bg-[#eeee]  rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-base' required type="text" placeholder='lastname' />
            </div>

          </div>
          <h3 className='text-lg font-medium mb-4 '>What's our Captain's email</h3>
          <input value={email} onChange={(e) => {
            setEmail(e.target.value);
          }} className='bg-[#eeee] mb-5 rounded px-4 py-2 border  w-full text-lg placeholder:text-base' required type="email" placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-4'>Enter Password</h3>
          <input value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} className='bg-[#eeee] mb-5 rounded px-4 py-2 border  w-full text-lg placeholder:text-base' required type="password" placeholder='Password' />

          <div className=''>
            <h3 className='text-lg font-medium mb-4'>Vehicle Information</h3>
            <div className='flex gap-2'>
              <input value={vehicleColor} onChange={(e) => {
                setVehicleColor(e.target.value)
              }} className='bg-[#eeee] mb-7 rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-base' required type="text" placeholder='Color' />
              <input value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value)
                }} className='bg-[#eeee] mb-7 rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-base' required type="text" placeholder='Plate' />
              </div>
            <div className='flex gap-2'>
              <input value={vehicleCapacity} onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }} className='bg-[#eeee] mb-7 rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-base' required type="number" min="1" placeholder='Capacity' />
            <select value={vehicleType} onChange={(e) => {
              setVehicleType(e.target.value)
            }} className='bg-[#eeee] mb-7 rounded px-4 py-2 border  w-1/2 text-lg placeholder:text-base' required name="vehicle.vehicleType">
              <option value="">Select type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
              </div>
          </div>
          <button className='bg-[#111] rounded px-4 py-2  w-full text-lg text-white mb-7'>Create Captain Account</button>
        </form>
        <p className='text-center mb-2'>Alread have a account? <Link to={"/captain-login"} className='text-blue-600'>Login Here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, includig by automated means, from Uber and its affiliates to the number provider </p>
      </div>
    </div>
  )
}

export default CaptainSignup
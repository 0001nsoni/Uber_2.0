import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div className='flex flex-col items-center justify-center'>
         <h5 className='p-3 w-full text-center absolute top-0 text-gray-200 text-xl '><i  onClick={()=>{props.setVehiclePanel(false)}} className='ri-arrow-down-wide-line '></i></h5>
        <h3 className='text-2xl  font-semibold mb-6 mt-5'>Choose a Vehicle</h3>
        <div onClick={()=>{props.setConfirmRidePanel(true);props.setVehiclePanel(false)}} className=' mb-3 active:border-2 rounded-2xl  w-full flex items-center justify-between px-3 py-6'>
          <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className='w-1/2'>
            <h4 className='text-sm font-medium'>UberGO <span><i className='ri-user-3-fill'></i>4</span></h4>
            <h5 className='text-sm font-medium'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-bold'>₹193.20</h2>
        </div>
        <div onClick={()=>{props.setConfirmRidePanel(true);props.setVehiclePanel(false)}} className=' mb-3 active:border-2 rounded-2xl  w-full flex items-center justify-between px-3 py-6'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className='w-1/2'>
            <h4 className='text-sm font-medium'>Moto <span><i className='ri-user-3-fill'></i>1</span></h4>
            <h5 className='text-sm font-medium'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle rides</p>
          </div>
          <h2 className='text-lg font-bold'>₹65.17</h2>
        </div>
        <div onClick={()=>{props.setConfirmRidePanel(true);props.setVehiclePanel(false)}} className=' mb-3 active:border-2 rounded-2xl  w-full flex items-center justify-between px-3 py-6'>
          <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className='w-1/2'>
            <h4 className='text-sm font-medium'>UberAuto <span><i className='ri-user-3-fill'></i>3</span></h4>
            <h5 className='text-sm font-medium'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, Auto rides</p>
          </div>
          <h2 className='text-lg font-bold'>₹118.21</h2>
        </div>
    </div>
  )
}

export default VehiclePanel
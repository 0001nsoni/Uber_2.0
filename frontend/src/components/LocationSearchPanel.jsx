import React from 'react'

const LocationSearchPanel = () => {
  return (
    <div>
        <div className='flex gap-5 my-2 items-center p-3 '>
            <h5 className='w-10 h-10 bg-[#eee] flex justify-center items-center rounded-full'><i className="ri-map-pin-user-fill"></i> </h5>
            <h4 className='font-medium'>221B Baker Street, London, NW1 6XE, UK</h4>
        </div>
         <div className='flex gap-5 my-2 items-center p-3 '>
            <h5 className='w-10 h-10 bg-[#eee] flex justify-center items-center rounded-full'><i className="ri-map-pin-user-fill"></i> </h5>
            <h4 className='font-medium'>221B Baker Street, London, NW1 6XE, UK</h4>
        </div>
    </div>
  )
}

export default LocationSearchPanel
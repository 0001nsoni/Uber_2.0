import React from 'react'

const LocationSearchPanel = (props) => {
  const locations = [
  "Connaught Place, Delhi",
  "Bandra Kurla Complex, Mumbai",
  "MG Road, Bangalore",
  "Park Street, Kolkata",
  "Gachibowli, Hyderabad"
];
console.log(props)
  return (
    <div>
      {
        locations.map(function(loc,idx){
          return <div key={idx} onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
          }} className='flex gap-5 border-2 border-gray-50 rounded-xl active:border-black my-2 items-center p-3 '>
            <h5 className='w-10 h-10 bg-[#eee] flex justify-center items-center rounded-full'><i className="ri-map-pin-user-fill"></i> </h5>
            <h4 className='font-medium'>{loc}</h4>
        </div>
        })
      }
        
    </div>
  )
}

export default LocationSearchPanel
import React from 'react'

const ConfirmRidePopUp = (props) => {
    return (
        <div className='h-screen p-2'>



            <h3 className="text-3xl w-full text-center font-bold mb-5 mt-5 ">Confirm this ride to start</h3>
            <div className='flex items-center justify-between gap-2 mb-3 bg-gray-50 rounded-lg'>
                <div className='flex items-center justify-between gap-2 '>
                    <img className='h-12 w-12 rounded-full object-cover ' src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                    <h2 className='text-2xl font-semibold'>Harsh Patel</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className="flex flex-col gap-4 gap-y-6 justify-between  items-center w-full">




                <div className="w-full flex items-start gap-3">
                    <div className="bg-gray-300 h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0">
                        <i className="ri-map-pin-range-fill"></i>
                    </div>
                    <div className="flex flex-col">
                        <h5 className="text-xl font-bold">562/11-A</h5>
                        <h5 className="font-semibold">Kaikondrahalli, Bengaluru, Karnataka</h5>
                    </div>
                </div>


                <div className="w-full flex items-start gap-3">
                    <div className="bg-gray-300 h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0">
                        <i className="ri-square-fill"></i>
                    </div>
                    <div className="flex flex-col w-full">
                        <h5 className="text-xl font-bold">Third Wave Cafe</h5>
                        <h5 className="font-semibold break-words whitespace-normal leading-snug text-sm text-gray-700">
                            17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru, Karnataka
                        </h5>
                    </div>
                </div>


                <div className="w-full flex items-start gap-3">
                    <div className="bg-gray-300 h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0">
                        <i className="ri-bank-card-2-fill"></i>
                    </div>
                    <div className="flex flex-col">
                        <h5 className="text-xl font-bold">₹193.20</h5>
                        <h5 className="font-semibold">Cash</h5>
                    </div>
                </div>


                <button onClick={() => {  }} className="w-full bg-green-600 text-white font-bold py-2 rounded-lg">Confirm</button>
                <button onClick={() => { props.setRidePopupPanel(false);props.setConfirmRidePopupPanel(false) }} className="w-full bg-red-500 text-white font-bold py-2 rounded-lg">Cancel</button>

            </div>
        </div>
    )
}

export default ConfirmRidePopUp
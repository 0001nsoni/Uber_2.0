import React, { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide';
import { useGSAP }  from '@gsap/react'
import gsap from 'gsap';

const CaptainRiding = () => {
    const [finsishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    useGSAP(function () {
        if (finsishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finsishRidePanel])
    return (

        <div className="h-screen w-full flex flex-col bg-white">

            <div className='fixed p-3 top-0 flex items-center  justify-between w-screen'>

                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link
                    to="/captain-home"
                    className=" h-10 w-10  bg-white shadow-md z-50 flex items-center justify-center rounded-full"
                >
                    <i className="ri-logout-box-r-line text-lg font-medium"></i>
                </Link>
            </div>

            {/* Image Section (Top) */}
            <div className="flex-[1.3] w-full">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Ride Animation"
                />
            </div>

            {/* Bottom Info Section */}
            <div className="w-full relative bg-yellow-400 p-4 rounded-lg shadow-md">
                {/* Close Icon */}
                <h5 className="absolute top-2 left-1/2 -translate-x-1/2 text-gray-700 text-2xl cursor-pointer">
                    <i
                       
                        className="ri-arrow-up-wide-line hover:text-gray-900 transition"
                    ></i>
                </h5>

                {/* Ride Info + Button */}
                <div className="flex w-full items-center justify-between mt-8" onClick={()=>{setFinishRidePanel(true)}}>
                    <h4 className="text-xl font-semibold text-gray-800">4 KM away</h4>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow">
                        Complete Ride
                    </button>
                </div>
            </div>
            <div ref={finishRidePanelRef} className='p-3 flex flex-col items-center justify-center bottom-0  fixed w-full z-10   bg-white'>
                <FinishRide setFinishRidePanel={setFinishRidePanel}  />
            </div>

        </div>



    )
}

export default CaptainRiding
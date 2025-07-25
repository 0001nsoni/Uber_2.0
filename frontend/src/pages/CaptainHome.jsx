import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmridePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null);

  // --- SOCKET.IO LOGIC ---
  const { captain } = useContext(CaptainDataContext);
  const { sendMessage } = useContext(SocketContext);

  useEffect(() => {
    let locationInterval;
    if (captain && captain._id) {
      sendMessage("join", { userType: "captain", userId: captain._id });

      // Send location every 10 seconds
      locationInterval = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            sendMessage('update-location-captain', {
              userId: captain._id,
              userType: "captain",
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
          });
        }
      }, 10000);
    }
    return () => clearInterval(locationInterval);
  }, [captain, sendMessage]);
  // --- END SOCKET.IO LOGIC ---

  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel]);
  useGSAP(function () {
    if (confirmridePopupPanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmridePopupPanel])
  return (
    <div className="h-screen w-full flex flex-col bg-white">

      <div className='fixed p-3 top-0 flex items-center  justify-between w-screen'>

        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link
          to="/home"
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
      <div className="w-full mt-5 px-4 py-4 flex flex-col justify-between overflow-auto gap-6">
        < CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className='p-3 flex flex-col items-center justify-center bottom-0  fixed w-full z-10   bg-white'>
        <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
      </div>
      <div ref={confirmRidePanelRef} className='p-3 flex flex-col items-center justify-center bottom-0 h-screen  fixed w-full z-10   bg-white'>
        <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>


    </div>
  )
}

export default CaptainHome
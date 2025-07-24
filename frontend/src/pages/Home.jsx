import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import axios from 'axios';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null); // 'pickup' or 'destination'

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  // Debounce timer
  const debounceTimer = useRef(null);

  // Fetch suggestions from backend
  const fetchSuggestions = (input) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
      params: { input },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setSuggestions(res.data.predictions || res.data);
      })
      .catch(() => setSuggestions([]));
  };

  // Handle input change for pickup/destination
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === 'pickup') setPickup(value);
    else setDestination(value);

    setActiveField(field);
    setPanelOpen(true);

    // Debounce API call
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') setPickup(suggestion.description || suggestion);
    else setDestination(suggestion.description || suggestion);
    // setPanelOpen(false);
    setSuggestions([]);
  };

  useGSAP(function () {
    if (panelOpen) {

      gsap.to(panelRef.current,
        {
          height: '70%',
          padding: '24'
        })
      gsap.to(panelCloseRef.current, { opacity: 1 })

    }
    else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: '0'

      })
      gsap.to(panelCloseRef.current, { opacity: 0 })
    }

  }, [panelOpen])
  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }


  }, [vehiclePanel])

  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0%)'
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [confirmRidePanel]);
  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0%)'
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [vehicleFound]);
  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0%)'
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      });
    }
  }, [waitingForDriver]);
function findTrip(){
  setVehiclePanel(true);
  setPanelOpen(false);
}

  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 absolute left-5 top-5 ' src=" https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className=' h-screen flex flex-col justify-end absolute top-0 w-full '>
        <div className='h-[30%] bg-white p-6 relative'>
          <h5 ref={panelCloseRef} onClick={() => { setPanelOpen(false) }} className=' opacity-0 absolute top-10 right-5 text-2xl font-bold'>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h4 className='text-3xl p-3 font-semibold '>Find a Trip</h4>
          <form action="">
            <input
              onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
              value={pickup}
              onChange={(e) => handleInputChange(e, 'pickup')}
              className='bg-[#eeee] px-8 py-2 text-base rounded-lg w-full mt-3 '
              type="text"
              placeholder='Add a pick-up location'
              autoComplete="off"
            />
            <input
              onClick={() => { setPanelOpen(true); setActiveField('destination'); }}
              value={destination}
              onChange={(e) => handleInputChange(e, 'destination')}
              className='bg-[#eeee] px-8 py-2 text-base rounded-lg w-full mt-3 '
              type="text"
              placeholder='Enter your destination'
              autoComplete="off"
            />
          </form>
          <button
            className="w-full bg-black text-white py-2 rounded-lg mt-4 font-semibold text-lg hover:bg-gray-900 transition"
          onClick={()=>{
            findTrip();
          }}
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className=' bg-white h-[0] '>
          <LocationSearchPanel
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
            panelOpen={panelOpen}
          />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='p-3 flex flex-col items-center justify-center  fixed w-full z-10 bottom-0  bg-white'>

        <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel} />

      </div>
      <div ref={confirmRidePanelRef} className='p-3 flex flex-col items-center justify-center  fixed w-full z-10 bottom-0  bg-white'>

        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />

      </div>
      <div ref={vehicleFoundRef} className='p-3 flex flex-col items-center justify-center  fixed w-full z-10 bottom-0  bg-white'>

        <LookingForDriver setVehicleFound={setVehicleFound} />

      </div>
      <div ref={waitingForDriverRef} className='p-3 flex flex-col items-center justify-center  fixed w-full z-10 bottom-0  bg-white'>

        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />

      </div>

    </div>
  )
}

export default Home
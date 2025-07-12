import React from 'react';
import { Link } from 'react-router-dom';

const Riding = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      {/* Home Button */}
      <Link
        to="/home"
        className="fixed h-10 w-10 top-2 left-2 bg-white shadow-md z-50 flex items-center justify-center rounded-full"
      >
        <i className="ri-home-5-line text-lg font-medium"></i>
      </Link>

      {/* Image Section (Top) */}
      <div className="flex-[1.3] w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Ride Animation"
        />
      </div>

      {/* Bottom Info Section */}
      <div className="flex-[1] w-full px-4 py-4 flex flex-col justify-between overflow-auto">
        {/* Driver Info */}
        <div className="flex items-center justify-between mb-4">
          <img
            className="h-16 w-auto object-contain"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt="Uber Logo"
          />
          <div className="text-right">
            <h2 className="text-base sm:text-lg font-medium">Neeraj</h2>
            <h4 className="text-lg sm:text-xl font-semibold -mb-1">MP04 AB 1234</h4>
            <p className="text-xs sm:text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        {/* Ride Details */}
        <div className="flex flex-col gap-4">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="bg-gray-300 h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0">
              <i className="ri-square-fill text-black"></i>
            </div>
            <div className="flex flex-col w-full">
              <h5 className="text-base sm:text-lg font-bold">Third Wave Cafe</h5>
              <p className="text-sm text-gray-700 leading-snug">
                17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru, Karnataka
              </p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-start gap-3">
            <div className="bg-gray-300 h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0">
              <i className="ri-bank-card-2-fill text-black"></i>
            </div>
            <div className="flex flex-col">
              <h5 className="text-base sm:text-lg font-bold">₹193.20</h5>
              <h5 className="text-sm sm:text-base font-semibold">Cash</h5>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button className="mt-6 w-full bg-green-600 text-white font-bold py-3 rounded-lg text-sm sm:text-base hover:bg-green-700 transition-all">
          Make a payment
        </button>
      </div>
    </div>
  );
};

export default Riding;

import React from 'react'

const CaptainDetails = () => {
  return (
    <div>{/* Top Row: Profile & Earnings */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 shadow-sm">
          {/* Profile */}
          <div className="flex items-center gap-3">
            <img
              className="h-12 w-12 rounded-full object-cover"
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              alt="Driver"
            />
            <h4 className="text-lg font-semibold">Neeraj Soni</h4>
          </div>

          {/* Earnings */}
          <div className="flex flex-col items-end text-right">
            <h4 className="text-xl font-bold">₹290.50</h4>
            <p className="text-sm text-gray-500 -mt-1">Earned</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between bg-gray-100  p-2 rounded-2xl items-center w-full gap-4 sm:w-3/4 md:w-2/3 mx-auto">
          <div className="flex flex-col items-center flex-1">
            <i className="ri-timer-2-line text-2xl text-gray-700"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 text-center">Hours online</p>
          </div>
          <div className="flex flex-col items-center flex-1">
            <i className="ri-speed-up-fill text-2xl text-gray-700"></i>
            <h5 className="text-lg font-medium">15</h5>
            <p className="text-sm text-gray-600 text-center">Trips Completed</p>
          </div>
          <div className="flex flex-col items-center flex-1">
            <i className="ri-booklet-line text-2xl text-gray-700"></i>
            <h5 className="text-lg font-medium">4.8</h5>
            <p className="text-sm text-gray-600 text-center">Rating</p>
          </div>
        </div></div>
  )
}

export default CaptainDetails
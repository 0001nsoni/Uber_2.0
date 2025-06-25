import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div className="w-full px-3 pt-10 pb-5  flex flex-col items-center">

            <h5 className=" w-full text-center text-gray-700 text-2xl cursor-pointer">
                <i onClick={() => { props.setVehicleFound(false) }} className="ri-arrow-down-wide-line"></i>
            </h5>


            <h3 className="text-2xl w-full text-center font-semibold mb-5">Looking for a driver</h3>


            <div className="flex flex-col gap-4 gap-y-6 justify-between items-center w-full">

                <img className="h-20 object-contain" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />


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



            </div>
        </div>
    )
}

export default LookingForDriver
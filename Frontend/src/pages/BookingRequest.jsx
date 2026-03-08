import React from 'react'

const BookingRequest = () => {
    return (
    <div className="flex items-center py-8 justify-center min-h-screen bg-gray-100 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Register Booking
          </h2>
        </div>

        <form className="flex flex-col gap-4">

          <div>
            <label className="text-sm font-medium text-gray-700">
              username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              category
            </label>
            <input
              type="text"
              placeholder="Enter category"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              description
            </label>
            <input
              type="text"
              placeholder="Enter description"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Booking date
            </label>
            <input
              type="date"
              placeholder="Enter date"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="image"
              placeholder="upload image"
              alt='img'
              className="w-full mt-1 px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-black cursor-pointer text-white py-2.5 rounded-md font-medium hover:bg-gray-900 transition"
          >
            Register Booking
          </button>
        </form>

      </div>
    </div>

  );
}

export default BookingRequest
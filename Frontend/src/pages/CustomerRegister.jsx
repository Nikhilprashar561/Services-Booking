import React from 'react'
import { Link } from 'react-router-dom';

const CustomerRegister = () => {
    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Login
          </h2>
        </div>

        <form className="flex flex-col gap-4">

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black cursor-pointer text-white py-2.5 rounded-md font-medium hover:bg-gray-900 transition"
          >
            Login to Dashboard
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to={"/admin-register"} className="text-black font-medium cursor-pointer hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>

  );
}

export default CustomerRegister
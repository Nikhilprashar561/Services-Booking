import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import SelectLoginType from "./SelectLoginType";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [SelectOpen, setSelectOpen] = React.useState(false)

  return (
    <>
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <a href="">
        <svg
          width="260"
          height="40"
          viewBox="0 0 260 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="50"
            y="26"
            font-family="Inter, Arial, sans-serif"
            font-size="25"
            font-weight="600"
            fill="#000"
          >
            Local Services
          </text>
        </svg>
      </a>

      <div className="hidden sm:flex text-black items-center gap-8">
        <Link to={"/booking-request"}>Booking</Link>
        <Link to={"/localProvider-profile"}>Find Provider</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search Provider"
          />
          <IoIosSearch size={25} />
        </div>

        <div className="relative cursor-pointer">
          <IoNotificationsOutline size={25} />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
            3
          </button>
        </div>

        <button onClick={() => setSelectOpen(true)} className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
          Login
        </button>

      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 w-full bg-white text-black shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to={"/localProvider-profile"} className="block">
          Booking Request
        </Link>
        <Link to={"/booking-request"} className="block">
          Find Local Provider
        </Link>
        <button onClick={() => setSelectOpen(true)} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
          Login
        </button>
      </div>
    </nav>
    {SelectOpen && <SelectLoginType close={() => setSelectOpen(false)} />}
    </>
  );
};

export default Header;

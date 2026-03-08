import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <footer className="flex flex-wrap justify-center lg:justify-between overflow-hidden gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-black">
        <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
          <a href="https://prebuiltui.com">
            <svg
              width="31"
              height="34"
              viewBox="0 0 31 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 4a6 6 0 0 0-6 6c0 1 .2 2 .6 2.9L4 22.5a2 2 0 0 0 0 2.8l1.7 1.7a2 2 0 0 0 2.8 0l9.6-9.6A6 6 0 1 0 19 4Z"
                stroke="url(#a)"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <defs>
                <linearGradient
                  id="a"
                  x1="15.5"
                  y1="2"
                  x2="15.5"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F8FAFC" />
                  <stop offset="1" stop-color="#383838" />
                </linearGradient>
              </defs>
            </svg>
          </a>
          <div>
            <p className="text-slate-100 font-semibold">Services</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/" className="hover:text-indigo-600 transition">
                  Electrician
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-indigo-600 transition">
                  Plumber
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-indigo-600 transition">
                  AC Repair
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-indigo-600 transition">
                  Home Cleaning
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-slate-100 font-semibold">For Customers</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to={"/"} className="hover:text-indigo-600 transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to={"/"} className="hover:text-indigo-600 transition">
                  Book a Service
                </Link>
              </li>
              <li>
                <Link to={"/"} className="hover:text-indigo-600 transition">
                  Track Booking
                </Link>
              </li>
              <li>
                <Link to={"/"} className="hover:text-indigo-600 transition">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to={"/"} className="hover:text-indigo-600 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-slate-100 font-semibold">Legal</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to={"/"} className="hover:text-indigo-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to={"/"} className="hover:text-indigo-600 transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
          <p className="max-w-60">
            Need a plumber, electrician, or cleaner? Find and book the best
            local experts in seconds.
          </p>
          <p className="mt-3 text-center">
            © 2025 <a href="https://prebuiltui.com">Local Services</a>
          </p>
        </div>
      </footer>
    </>
  );
}

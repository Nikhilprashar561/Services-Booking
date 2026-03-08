import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";


const Home = () => {

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        `}
      </style>
      <Header />
      <section className=" w-full bg-no-repeat bg-cover bg-center text-sm pb-44">
        {/* HERO TEXT */}
        <div className="flex items-center gap-2 border border-slate-300 hover:border-slate-400/70 rounded-full w-max mx-auto px-4 py-2 mt-40 md:mt-32">
          <span>Your Local Services, Just One Click Away</span>
          <button className="flex items-center gap-1 font-medium">
            <Link to={"/localProvider-profile"} className="text-blue-400 cursor-pointer">Booked</Link>
          </button>
        </div>

        <h5 className="text-4xl md:text-7xl font-medium max-w-[850px] text-center mx-auto mt-8">
          Hire Trusted Local Professionals For Every Home Need
        </h5>

        <p className="text-sm md:text-base mx-auto max-w-2xl text-center mt-6 max-md:px-2">
          Book skilled professionals for your everyday needs — from home repair
          to cleaning — all in one simple and reliable platform.
        </p>

        <div className="mx-auto w-full flex items-center justify-center gap-3 mt-4">
          <button className="bg-slate-800 hover:bg-black text-white px-6 py-3 rounded-full font-medium transition">
            Find a Service
          </button>

          <button className="flex items-center gap-2 border border-slate-300 hover:bg-slate-200/30 rounded-full px-6 py-3">
            Become a Provider
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;

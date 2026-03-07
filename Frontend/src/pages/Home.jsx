import React from "react";

const Home = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://images.pexels.com/photos/4981795/pexels-photo-4981795.jpeg?_gl=1*1qggkxy*_ga*MjM2MjM0MDQzLjE3Njk4NzcwNjQ.*_ga_8JE65Q40S6*czE3NzI4Nzg1MzAkbzQkZzEkdDE3NzI4Nzg3ODUkajYwJGwwJGgw"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Local Services Provider</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

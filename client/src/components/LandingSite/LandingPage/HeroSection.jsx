import React from 'react';

const colorChangeKeyframes = `
  @keyframes colorChange {
    0% { color: #ff0000; }   /* Red */
    25% { color: #00ff00; }  /* Green */
    50% { color: #0000ff; }  /* Blue */
    75% { color: #ff00ff; }  /* Magenta */
    100% { color: #ff0000; } /* Red */
  }
`;

const style = {
  animation: 'colorChange 5s infinite',
};

function HeroSection() {
  return (
    <main className="flex flex-col lg:flex-row-reverse justify-center items-center text-white text-center">
      <style>{colorChangeKeyframes}</style>
      <div className="md:pt-[8%]">
        <h1 className="font-bold text-6xl" style={style}>
          Hostel <span className="text-blue-500">Management</span> System
        </h1>
        <div className="py-20 flex flex-col lg:flex-row justify-center gap-6">
          <a
            href="/auth/login"
            className="bg-blue-500 py-3 px-8 hover:bg-blue-700 transition md:rounded-full text-2xl"
          >
            Login
          </a>
          <a
            href="/auth/request"
            className="bg-blue-500 py-3 px-8 hover:bg-blue-700 transition md:rounded-full text-2xl"
          >
            Request Registration
          </a>
        </div>
      </div>
    </main>
  );
}

export { HeroSection };

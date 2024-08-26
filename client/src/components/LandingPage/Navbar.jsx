import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuStyles = `flex-col absolute top-0 left-0 w-full h-full bg-gray-900 text-white px-10 py-40 text-3xl font-bold space-y-6`;

  return (
    <nav className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white md:px-10">
      <a href="/" className="flex items-center z-10 text-xl font-bold lg:text-3xl text-yellow-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 lg:w-10 lg:h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
          />
        </svg>
        &nbsp; HMS
      </a>
      <div className={`flex ${menuOpen ? mobileMenuStyles : "hidden"} md:flex gap-10`}>
       
        <a
          href="/auth/request"
          className="md:py-3 transition-colors duration-300 hover:text-yellow-400"
        >
          Request
        </a>
        <a
          href="/auth/login"
          className={`md:bg-yellow-500 md:hover:bg-yellow-600 transition-colors duration-300 text-gray-900 font-bold md:py-3 md:px-6 md:rounded-full ${
            menuOpen ? "text-yellow-400" : ""
          }`}
        >
          Login
        </a>
      </div>
      <div
        className="md:hidden z-10 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </nav>
  );
}

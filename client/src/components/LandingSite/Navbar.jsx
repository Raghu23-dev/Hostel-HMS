import { useState } from "react";
import hmsVideo from "../../assets/HMS.mp4"; 

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-custom-dark text-white shadow-md">
      {/* Logo - Video */}
      <a href="/" className="flex items-center overflow-hidden">
        <video
          src={hmsVideo}
          className="h-16 w-40 object-cover transform scale-150" // Increased size and zoom
          autoPlay
          loop
          muted
        />
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        <a
          href="/auth/admin-login"
          className="py-2 px-4 text-center bg-blue-500 hover:bg-blue-700 text-white rounded-md transition transform hover:scale-105 shadow"
        >
          Admin Login
        </a>
        <a
          href="/auth/login"
          className="py-2 px-4 text-center bg-blue-500 hover:bg-blue-700 text-white rounded-md transition transform hover:scale-105 shadow"
        >
          Student Login
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden z-20 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="w-6 h-6 flex flex-col justify-between items-center">
          <span
            className={`block h-1 w-full bg-white transform transition duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-white transition duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-1 w-full bg-white transform transition duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col items-center justify-center absolute top-0 left-0 w-full h-screen bg-custom-dark text-white md:hidden transition-transform duration-300`}
      >
        <a
          href="/auth/admin-login"
          className="py-3 px-6 text-center bg-blue-500 hover:bg-blue-700 text-white rounded-md transition duration-200 transform hover:scale-105 shadow mb-4"
        >
          Admin Login
        </a>
        <a
          href="/auth/login"
          className="py-3 px-6 text-center bg-blue-500 hover:bg-blue-700 text-white rounded-md transition duration-200 transform hover:scale-105 shadow"
        >
          Student Login
        </a>
      </div>
    </nav>
  );
}

export { Navbar };

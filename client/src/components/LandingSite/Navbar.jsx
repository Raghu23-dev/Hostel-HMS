import { useState } from "react"; // Importing useState hook from React
import hmsVideo from "../../assets/HMS.mp4"; // Importing video file for logo

function Navbar() {
  // State to manage the menu open/closed state
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-custom-dark text-white shadow-md">
      {/* Logo - Video */}
      <a href="/" className="flex items-center overflow-hidden">
        <video
          src={hmsVideo} // Source of the video
          className="h-16 w-40 object-cover transform scale-150" // Styling for the video
          autoPlay // Play video automatically
          loop // Loop the video
          muted // Mute the video
        />
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        {/* Admin Login link */}
        <a
          href="/auth/admin-login"
          className="py-2 px-4 text-center bg-transparent text-white rounded-md shadow-lg relative transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:bg-white hover:text-black"
        >
          Admin Login
        </a>
        {/* Student Login link */}
        <a
          href="/auth/login"
          className="py-2 px-4 text-center bg-transparent text-white rounded-md shadow-lg relative transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:bg-white hover:text-black"
        >
          Student Login
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden z-20 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)} // Toggle menu state on button click
        aria-label="Toggle menu" // Accessibility label for the button
      >
        <div className="w-6 h-6 flex flex-col justify-between items-center">
          {/* Top bar of the hamburger icon */}
          <span
            className={`block h-1 w-full bg-white transform transition duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          {/* Middle bar of the hamburger icon */}
          <span
            className={`block h-1 w-full bg-white transition duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          {/* Bottom bar of the hamburger icon */}
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
        } flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-custom-dark text-white md:hidden transition-transform duration-300 z-10`}
      >
        {/* Admin Login link in mobile menu */}
        <a
          href="/auth/admin-login"
          className="py-3 px-6 text-center bg-transparent text-white rounded-md shadow-lg relative transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:bg-white hover:text-black mb-4"
          onClick={() => setMenuOpen(false)} // Close menu on click
        >
          Admin Login
        </a>
        {/* Student Login link in mobile menu */}
        <a
          href="/auth/login"
          className="py-3 px-6 text-center bg-transparent text-white rounded-md shadow-lg relative transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:bg-white hover:text-black"
          onClick={() => setMenuOpen(false)} // Close menu on click
        >
          Student Login
        </a>
      </div>
    </nav>
  );
}

export { Navbar };

import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const mobileMenuStyles = `flex-col absolute top-0 left-0 w-full h-full bg-black py-40 text-2xl font-bold space-y-6`;

  return (
    <nav className="flex items-center justify-between p-6 bg-gray-900 text-white">
      <a href="/" className="flex items-center font-bold text-xl lg:text-3xl">
        HMS
      </a>
      <div
        className={`flex gap-6 md:flex ${menuOpen ? mobileMenuStyles : "hidden"}`}
      >
        <a
          href="/auth/request"
          className="py-3 px-6 text-center bg-blue-500 hover:bg-blue-700 text-white rounded-lg transition-transform transform hover:scale-105"
        >
          Request
        </a>
        <a
          href="/auth/admin-login"
          className="py-3 px-6 text-center bg-blue-500 hover:bg-blue-700 text-white rounded-lg transition-transform transform hover:scale-105"
        >
          Admin Login
        </a>
        <a
          href="/auth/login"
          className="py-3 px-6 text-center bg-blue-500 hover:bg-blue-700 text-white rounded-lg transition-transform transform hover:scale-105"
        >
          Login
        </a>
      </div>
      <div
        className="md:hidden z-10"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {/* Placeholder for menu icon */}
        <div className="w-6 h-6 bg-gray-600 rounded"></div>
      </div>
    </nav>
  );
}

export { Navbar };

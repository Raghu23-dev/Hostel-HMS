import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      for: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function Sidebar({ links }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  const filteredLinks = links.filter(
    (link) => !["mess off", "invoices"].includes(link.text.toLowerCase())
  );

  return (
    <div>
      <button
        className={`fixed flex gap-2 md:hidden z-50 top-[6rem] left-20 ml-10 bg-gray-800 p-1 rounded-full shadow-lg text-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-20" : "-translate-x-20"
        }`}
        onClick={toggleMenu}
      >
        <span className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}>☰</span>
        <span className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}>✕</span>
      </button>
      <div
        className={`flex flex-col justify-between h-screen w-screen absolute md:static sm:w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link
          to={`/${filteredLinks[0]?.for}-dashboard`}
          className="py-4 px-4 md:py-5 lg:py-4 gap-2 bg-gray-800 flex items-center text-2xl hover:bg-gray-700 transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
          {/* Dashboard */}
        </Link>
        <div className="flex flex-col space-y-1 text-2xl text-white">
          
          {filteredLinks.map((link) => (
            <Link
              to={link.url}
              key={link.text}
              className={`py-2 px-4 flex items-center gap-2 ${
                location.pathname === link.url
                  ? "text-blue-500"
                  : "hover:text-blue-500"
              } hover:bg-gray-700 transition-transform duration-200 ease-in-out transform hover:scale-105`}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className="p-4">
        <button
          onClick={logout}
          className="w-full flex gap-2 justify-center text-white bg-red-600 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-200 ease-in-out transform hover:scale-105 mb-2"
        >
          Logout
        </button>
          
        </div>
      </div>
    </div>
  );
}

export { Sidebar };

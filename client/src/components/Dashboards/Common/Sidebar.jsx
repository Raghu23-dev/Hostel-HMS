import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Define prop types for the Sidebar component to validate the props passed to it.
Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    // Ensures that the `links` prop is an array of objects with specific properties.
    PropTypes.shape({
      text: PropTypes.string.isRequired, // The text to display for each link.
      url: PropTypes.string.isRequired,  // The URL the link points to.
      for: PropTypes.string.isRequired,  // A value used for conditional rendering or navigation.
    })
  ).isRequired, // Specifies that `links` is a required prop.
};

// Sidebar component that renders a navigational sidebar with toggle functionality.
function Sidebar({ links }) {
  const navigate = useNavigate(); // Hook to programmatically navigate the user.
  const [isOpen, setIsOpen] = useState(true); // State to manage the sidebar open/close status.
  const location = useLocation(); // Hook to access the current location object.

  // Logout function that removes specific items from local storage and navigates to the home page.
  const logout = () => {
    localStorage.removeItem("student"); // Removes 'student' data from local storage.
    localStorage.removeItem("token");   // Removes 'token' data from local storage.
    navigate("/");                      // Redirects to the home page.
  };

  // Function to toggle the sidebar open/close state.
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggles the `isOpen` state.
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State to track the window width.

  // Function to set the window dimensions and adjust the sidebar state based on screen size.
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth); // Updates the state with the current window width.
    if (window.innerWidth >= 768) {    // If the screen width is 768px or more, keep the sidebar open.
      setIsOpen(true);
    }
  };

  // useEffect hook to add and remove the resize event listener.
  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions); // Adds event listener on component mount.
    return () => {
      window.removeEventListener("resize", setWindowDimensions); // Cleans up event listener on unmount.
    };
  }, []);

  // Filters out links that should not be displayed in the sidebar.
  const filteredLinks = links.filter(
    (link) => !["mess off", "invoices"].includes(link.text.toLowerCase()) // Filters out links based on text.
  );

  return (
    <div>
      {/* Button to toggle sidebar visibility on mobile devices */}
      <button
        className={`fixed flex gap-2 md:hidden z-50 top-[6rem] left-20 ml-10 bg-gray-800 p-1 rounded-full shadow-lg text-white transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-20" : "-translate-x-20"
        }`}
        onClick={toggleMenu} // Calls toggleMenu function when clicked.
      >
        {/* Hamburger icon when the sidebar is closed */}
        <span className={`w-6 h-6 ${isOpen ? "hidden" : "block"}`}>☰</span>
        {/* Close icon when the sidebar is open */}
        <span className={`w-6 h-6 ${isOpen ? "block" : "hidden"}`}>✕</span>
      </button>

      {/* Sidebar main container */}
      <div
        className={`flex flex-col justify-between h-screen w-screen absolute md:static sm:w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Dashboard link at the top of the sidebar */}
        <Link
          to={`/${filteredLinks[0]?.for}-dashboard`} // Navigates to the dashboard based on the first filtered link.
          className="py-4 px-4 md:py-5 lg:py-4 gap-2 bg-gray-800 flex items-center text-2xl hover:bg-gray-700 transition-transform duration-200 ease-in-out transform hover:scale-110"
        >
          {/* Placeholder for Dashboard text/icon (could be customized) */}
        </Link>

        {/* Render links dynamically based on filteredLinks */}
        <div className="flex flex-col space-y-1 text-2xl text-white">
          {filteredLinks.map((link) => (
            <Link
              to={link.url} // Sets the link destination URL.
              key={link.text} // Uses link text as the key.
              className={`py-2 px-4 flex items-center gap-2 ${
                location.pathname === link.url // Applies styles based on the current URL.
                  ? "text-blue-500"            // Active link style.
                  : "hover:text-blue-500"      // Hover style.
              } hover:bg-gray-700 transition-transform duration-200 ease-in-out transform hover:scale-110`}
            >
              {link.text} {/* Displays the link text */}
            </Link>
          ))}
        </div>

        {/* Logout button at the bottom of the sidebar */}
        <div className="p-4">
          <button
            onClick={logout} // Calls the logout function when clicked.
            className="w-full flex gap-2 justify-center text-white bg-red-600 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform duration-200 ease-in-out transform hover:scale-110 mb-2"
          >
            Logout {/* Logout text or icon */}
          </button>
        </div>
      </div>
    </div>
  );
}

// Exporting the Sidebar component for use in other parts of the application.
export { Sidebar };

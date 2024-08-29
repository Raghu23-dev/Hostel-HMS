import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Topbar.propTypes = {
  name: PropTypes.string.isRequired,
};

function Topbar({ name }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("token");
    navigate("/");
  };

  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="py-3 px-5 flex items-center justify-between text-white w-full bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3">
        <span>{date.toLocaleTimeString()}</span>
      </div>
      <span className="font-bold text-2xl text-blue-500">
        <span className="font-thin text-lg text-white">Hello there 👋,</span> {name}
      </span>
      <button
        onClick={logout}
        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-transform duration-200 ease-in-out transform hover:scale-105"
      >
        Logout
      </button>
    </div>
  );
}

export { Topbar };

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
    <div className="py-5 px-5 flex items-center justify-between text-white w-full bg-gray-800 shadow-lg fixed top-0 left-64 w-[calc(100%-16rem)] z-50">
      <div className="flex items-center gap-3">
        {date.toLocaleTimeString()}
      </div>
      <span className="font-bold text-2xl absolute right-5 top-1/2 transform -translate-y-1/2 text-blue-500"><span className="font-thin text-lg text-white">Hello there 👋,</span> {name}</span>
    </div>
  );
}

export { Topbar };

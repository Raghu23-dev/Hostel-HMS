import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Topbar() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="py-5 px-5 flex items-center justify-between text-white w-full bg-stone-950 shadow-lg absolute top-0 md:w-[83.3vw] md:ml-[16.7vw]">
      {date.toLocaleTimeString()}
      <span>Student Name</span>
      <div className="flex gap-3">
        <Link to="/logout">
        <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="w-6 h-6 hover:text-blue-500"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M6 18L18 6M6 6l12 12"
  />
</svg>

        </Link>
      </div>
    </div>
  );
}

export { Topbar };
